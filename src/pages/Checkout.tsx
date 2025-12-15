import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

const checkoutSchema = z.object({
  fullName: z.string().trim().min(1, 'Full name is required').max(100),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, 'Invalid Indian phone number'),
  email: z.string().trim().email('Invalid email').max(255).optional().or(z.literal('')),
  addressLine1: z.string().trim().min(1, 'Address is required').max(200),
  addressLine2: z.string().trim().max(200).optional(),
  city: z.string().trim().min(1, 'City is required').max(100),
  state: z.string().min(1, 'State is required'),
  pincode: z.string().trim().regex(/^\d{6}$/, 'Invalid pincode'),
  orderNotes: z.string().max(500).optional(),
  paymentMethod: z.enum(['COD', 'Razorpay']),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ua = typeof navigator !== 'undefined' ? navigator.userAgent || '' : '';
  const isMobile = /iPhone|iPad|iPod|Android/i.test(ua);
  const isWebView =
    /(wv|webview|; wv\))/i.test(ua) ||
    (window as any).ReactNativeWebView ||
    /FBAN|FBAV|Instagram|Line\/|WhatsApp/i.test(ua);
  const isMobileBrowser = isMobile && !isWebView;

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      pincode: '',
      orderNotes: '',
      paymentMethod: 'COD',
    },
  });

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  if (cartItems.length === 0) {
    return null;
  }

  const subtotal = getCartTotal();
  const shippingCost = subtotal >= 500 ? 0 : 50;
  const total = subtotal + shippingCost;

  const onSubmit = async (data: CheckoutFormData) => {
    console.log('[Checkout] Submitting order', {
      paymentMethod: data.paymentMethod,
      platform: navigator.userAgent,
    });

    // In-app browsers (WhatsApp/Instagram/Facebook/etc.) block UPI intents.
    // Prevent starting Razorpay in a webview to avoid stuck "processing" screens.
    if (data.paymentMethod === 'Razorpay' && isWebView) {
      toast({
        title: 'Open in browser to pay',
        description: 'UPI apps cannot open inside this app. Please open in Chrome/Safari or use COD.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const orderItems = cartItems.map(item => ({
        product_id: item.product.id,
        product_name: item.product.name,
        variant: item.variant.weight,
        price: item.variant.price,
        quantity: item.quantity,
      }));

      const orderData = {
        customer_name: data.fullName,
        phone: data.phone,
        email: data.email || null,
        address_line1: data.addressLine1,
        address_line2: data.addressLine2 || null,
        city: data.city,
        state: data.state,
        pincode: data.pincode,
        order_notes: data.orderNotes || null,
        items: orderItems,
        // Server will recompute prices to prevent tampering; client fields are informational.
        subtotal,
        shipping_charge: shippingCost,
        total,
        payment_method: data.paymentMethod,
        order_status: data.paymentMethod === 'COD' ? 'Received' : 'Payment Pending',
      };

      // Create order via edge function
      const { data: orderResponse, error: orderError } = await supabase.functions.invoke('create-order', {
        body: { orderData },
      });

      if (orderError || orderResponse?.error) {
        console.error('Order creation error:', {
          orderError,
          orderResponse,
        });

        toast({
          title: 'Could not place order',
          description:
            (orderResponse as any)?.details?.[0]?.message ||
            (orderResponse as any)?.error ||
            orderError?.message ||
            'Please check your details and try again.',
          variant: 'destructive',
        });

        return;
      }

      const orderId = orderResponse.orderId;
      console.log('Order created in database:', orderId);

      if (data.paymentMethod === 'COD') {
        // COD flow - order is already created with 'Received' status
        clearCart();
        navigate('/order-confirmation', { state: { orderId } });

        toast({
          title: 'Order placed successfully!',
          description: `Your order has been placed and will be delivered via Cash on Delivery.`,
        });
      } else {
        // Razorpay flow - create order via edge function
        try {
          const { data: razorpayOrder, error: razorpayError } = await supabase.functions.invoke('create-razorpay-order', {
            body: {
              amount: total,
              currency: 'INR',
              receipt: `receipt_${orderId.slice(-8)}`,
              notes: { order_id: orderId },
            },
          });

          if (razorpayError || razorpayOrder?.error) {
            console.error('Razorpay order creation error:', {
              razorpayError,
              razorpayOrder,
            });

            toast({
              title: 'Payment could not be started',
              description:
                (razorpayOrder as any)?.details?.[0]?.message ||
                (razorpayOrder as any)?.error ||
                razorpayError?.message ||
                'Please try again or choose COD.',
              variant: 'destructive',
            });

            return;
          }

          console.log('Razorpay order created:', razorpayOrder.id);

          // Use safer flows per context:
          // - WebView: full-page redirect to Razorpay hosted page (avoids modal black flash)
          // - Mobile browser: UPI intent + redirect for better success
          // - Desktop: popup (redirect false)
          const callbackUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/razorpay-callback`;
          const webViewOverrides = isWebView
            ? {
                redirect: true,
                callback_url: callbackUrl,
                method: undefined,
                upi: undefined,
              }
            : {};
          const mobileBrowserUpi = isMobileBrowser
            ? {
                method: 'upi',
                upi: { flow: 'intent' },
                redirect: true,
                callback_url: callbackUrl,
              }
            : {};

          const options: any = {
            key: razorpayOrder.key_id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            name: 'Golden Harvest',
            description: 'Order Payment',
            order_id: razorpayOrder.id,
            // Defaults: desktop popup
            redirect: false,
            ...mobileBrowserUpi,
            ...webViewOverrides,
            prefill: {
              name: data.fullName,
              email: data.email || '',
              contact: data.phone,
            },
            notes: {
              order_id: orderId,
            },
            handler: async (response: any) => {
              try {
                console.log('Payment response received:', response);
                // Verify payment via edge function
                const { data: verifyData, error: verifyError } = await supabase.functions.invoke('verify-razorpay-payment', {
                  body: {
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                    order_id: orderId,
                  },
                });

                if (verifyError || verifyData?.status !== 'ok') {
                  throw new Error('Payment verification failed');
                }

                clearCart();
                navigate('/order-confirmation', { state: { orderId } });

                toast({
                  title: 'Payment successful!',
                  description: 'Your order has been confirmed and payment received.',
                });
              } catch (verifyErr) {
                console.error('Payment verification error:', verifyErr);
                await supabase
                  .from('orders')
                  .update({ order_status: 'Payment Failed' })
                  .eq('id', orderId);

                toast({
                  title: 'Payment verification failed',
                  description: 'Please contact support if amount was debited.',
                  variant: 'destructive',
                });
              }
            },
            modal: {
              ondismiss: async () => {
                // Check if payment was actually completed (for mobile UPI flow)
                // Sometimes the handler doesn't fire on mobile, so we poll the order status
                console.log('Modal dismissed, checking payment status...');
                
                // Wait a moment for any pending webhooks
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Check order status from database
                const { data: orderData } = await supabase
                  .from('orders')
                  .select('order_status')
                  .eq('id', orderId)
                  .single();
                
                if (orderData?.order_status === 'Paid') {
                  // Payment was successful via webhook
                  clearCart();
                  navigate('/order-confirmation', { state: { orderId } });
                  toast({
                    title: 'Payment successful!',
                    description: 'Your order has been confirmed.',
                  });
                } else {
                  // Payment was cancelled or failed
                  await supabase
                    .from('orders')
                    .update({ order_status: 'Payment Cancelled' })
                    .eq('id', orderId);

                  toast({
                    title: 'Payment cancelled',
                    description: 'You can try again or choose COD.',
                    variant: 'destructive',
                  });
                }
              },
              escape: false,
              backdropclose: false,
              confirm_close: true, // Ask user before closing on mobile
            },
            theme: {
              color: '#059669',
            },
            // Enable proper UPI intent handling for mobile
            ...(isMobile && {
              config: {
                display: {
                  preferences: {
                    show_default_blocks: true,
                  }
                }
              }
            }),
          };

          const rzp = new (window as any).Razorpay(options);
          
          // Handle payment failure event
          rzp.on('payment.failed', async (response: any) => {
            console.error('Payment failed:', response.error);
            await supabase
              .from('orders')
              .update({ order_status: 'Payment Failed' })
              .eq('id', orderId);

            toast({
              title: 'Payment failed',
              description: response.error?.description || 'Please try again.',
              variant: 'destructive',
            });
          });
          
          rzp.open();

          // Fallback: when user returns from UPI app, the handler may not fire.
          // We poll the order status on visibility/focus and auto-complete if paid.
          let pollInterval: NodeJS.Timeout | null = null;
          const cleanupVisibilityListener = () => {
            document.removeEventListener('visibilitychange', onVisibilityChange);
            if (pollInterval) {
              clearInterval(pollInterval);
              pollInterval = null;
            }
          };

          const checkPaymentStatus = async () => {
            const { data: orderData } = await supabase
              .from('orders')
              .select('order_status')
              .eq('id', orderId)
              .single();

            if (orderData?.order_status === 'Paid') {
              cleanupVisibilityListener();
              clearCart();
              navigate('/order-confirmation', { state: { orderId } });
              toast({
                title: 'Payment successful!',
                description: 'Your order has been confirmed.',
              });
            }
          };

          const onVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
              // Check once on return to the browser
              checkPaymentStatus();
              // Also start a short-lived poll to catch delayed webhooks
              if (pollInterval) clearInterval(pollInterval);
              pollInterval = setInterval(checkPaymentStatus, 2000);
              // Stop polling after 10 seconds
              setTimeout(() => {
                if (pollInterval) {
                  clearInterval(pollInterval);
                  pollInterval = null;
                }
              }, 10000);
            }
          };

          document.addEventListener('visibilitychange', onVisibilityChange);
          rzp.on('payment.failed', cleanupVisibilityListener);
          rzp.on('modal.closed', cleanupVisibilityListener);

        } catch (razorpayErr) {
          // Ensure we do not leak listeners on init errors
          if (typeof document !== 'undefined') {
            document.removeEventListener('visibilitychange', onVisibilityChange);
          }
          console.error('Razorpay error:', razorpayErr);
          // Update order status to 'Payment Failed'
          await supabase
            .from('orders')
            .update({ order_status: 'Payment Failed' })
            .eq('id', orderId);

          toast({
            title: 'Payment initialization failed',
            description: 'Please try again or choose COD.',
            variant: 'destructive',
          });
        }
      }
    } catch (error) {
      console.error('Order submission error:', error);
      toast({
        title: 'Error',
        description: 'Failed to place order. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <div className="w-full py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-8 animate-fade-in">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <Card className="border-border">
              <CardContent className="p-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number *</FormLabel>
                            <FormControl>
                              <Input placeholder="10-digit mobile number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="your@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="addressLine1"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address Line 1 *</FormLabel>
                          <FormControl>
                            <Input placeholder="House no., Street name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="addressLine2"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address Line 2 (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Landmark, Area" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City *</FormLabel>
                            <FormControl>
                              <Input placeholder="City" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State *</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select state" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {indianStates.map(state => (
                                  <SelectItem key={state} value={state}>{state}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="pincode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pincode *</FormLabel>
                            <FormControl>
                              <Input placeholder="6-digit pincode" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="paymentMethod"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Payment Method *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select payment method" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="COD">Cash on Delivery (COD)</SelectItem>
                              <SelectItem value="Razorpay">Online Payment (Razorpay)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="orderNotes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Order Notes (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Any special instructions for your order"
                              rows={3}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="p-4 bg-primary/5 rounded-lg">
                      <p className="text-sm text-foreground/70 text-center">
                        {form.watch('paymentMethod') === 'COD'
                          ? 'Payment Method: Cash on Delivery (COD) - Pay when you receive your order'
                          : 'Payment Method: Online Payment (Razorpay) - Secure payment gateway'
                        }
                      </p>
                    </div>

                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full bg-primary hover:bg-primary/90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Placing Order...' : 'Place Order'}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="animate-fade-in-delay-2">
            <Card className="border-muted bg-muted/50 sticky top-20 hover:shadow-md hover:scale-105 transition-all duration-300">
              <CardContent className="p-6">
                <h2 className="text-xl font-serif font-bold text-primary mb-6">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  {cartItems.map(item => (
                    <div key={`${item.product.id}-${item.variant.weight}`} className="flex justify-between text-sm">
                      <span className="text-foreground/80">
                        {item.product.name} ({item.variant.weight}) × {item.quantity}
                      </span>
                      <span className="font-medium">₹{(item.variant.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 mb-4 border-t border-border pt-4">
                  <div className="flex justify-between text-foreground/80">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-foreground/80">
                    <span>Shipping</span>
                    <span>{shippingCost === 0 ? 'Free' : `₹${shippingCost}`}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-primary border-t border-border pt-2">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="p-4 bg-primary/5 rounded-lg">
                  <p className="text-sm text-foreground/70 text-center">
                    Payment Method: {form.watch('paymentMethod') === 'COD' ? 'Cash on Delivery (COD)' : 'Online Payment (Razorpay)'}<br />
                    All India Shipping
                  </p>
                  {form.watch('paymentMethod') === 'Razorpay' && isWebView && (
                    <div className="mt-3 text-sm text-yellow-800 bg-yellow-100 border border-yellow-200 rounded-md p-3 text-center space-y-2">
                      <p className="text-sm">
                        UPI apps cannot open inside this app/browser. Tap below to open in your mobile browser, then retry Razorpay; or use Cash on Delivery.
                      </p>
                      <div className="flex justify-center gap-2">
                        <a
                          href={window.location.href}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3 py-2 rounded-md bg-primary text-white text-sm font-medium hover:bg-primary/90"
                        >
                          Open in browser
                        </a>
                        <a
                          href={`intent://${window.location.host}${window.location.pathname}#Intent;scheme=${window.location.protocol.replace(':', '')};package=com.android.chrome;end`}
                          className="px-3 py-2 rounded-md bg-white text-primary border border-primary text-sm font-medium hover:bg-primary/10"
                        >
                          Try Chrome (Android)
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
