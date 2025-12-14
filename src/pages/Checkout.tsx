import { useState } from 'react';
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

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  const subtotal = getCartTotal();
  const shippingCost = subtotal >= 500 ? 0 : 50;
  const total = subtotal + shippingCost;

  const onSubmit = async (data: CheckoutFormData) => {
    setIsSubmitting(true);
    try {
      const orderData = {
        formType: 'order',
        orderId: `GH${Date.now()}`,
        customer_name: data.fullName,
        phone: data.phone,
        email: data.email || null,
        address_line1: data.addressLine1,
        address_line2: data.addressLine2 || null,
        city: data.city,
        state: data.state,
        pincode: data.pincode,
        order_notes: data.orderNotes || null,
        items: cartItems.map(item => ({
          product_id: item.product.id,
          product_name: item.product.name,
          variant: item.variant.weight,
          price: item.variant.price,
          quantity: item.quantity,
        })),
        subtotal,
        shipping_charge: shippingCost,
        total,
        payment_method: data.paymentMethod,
        order_status: data.paymentMethod === 'COD' ? 'Pending' : 'Payment Pending',
      };

      console.log('Submitting order to local storage...');

      // Submit order data to local server for storage
      const response = await fetch('http://localhost:3001/store-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit order');
      }

      const result = await response.json();
      console.log('Order submitted successfully:', result);

      if (data.paymentMethod === 'COD') {
        // COD flow - order is already created with 'Pending' status
        clearCart();
        navigate('/order-confirmation', { state: { orderId: orderData.orderId } });

        toast({
          title: 'Order placed successfully!',
          description: `Your order #${orderData.orderId} has been placed and will be delivered via Cash on Delivery.`,
        });
      } else {
        // Razorpay flow
        try {
          // Create Razorpay order
          const razorpayResponse = await fetch('http://localhost:3001/create-order', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              amount: total,
              currency: 'INR',
              receipt: `receipt_${orderData.orderId}`,
              notes: {
                order_id: orderData.orderId,
              },
            }),
          });

          if (!razorpayResponse.ok) {
            throw new Error('Failed to create Razorpay order');
          }

          const razorpayOrder = await razorpayResponse.json();

          // Open Razorpay checkout
          const options = {
            key: 'YOUR_KEY_ID', // Replace with your Razorpay key_id
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency,
            name: 'Golden Harvest',
            description: 'Order Payment',
            order_id: razorpayOrder.id,
            prefill: {
              name: data.fullName,
              email: data.email || '',
              contact: data.phone,
            },
            handler: async (response: any) => {
              try {
                // Verify payment
                const verifyResponse = await fetch('http://localhost:3001/verify-payment', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                  }),
                });

                if (verifyResponse.ok) {
                  // Update order status to 'Paid' in local storage
                  const updateData = {
                    formType: 'order',
                    orderId: orderData.orderId,
                    order_status: 'Paid',
                  };

                  await fetch('http://localhost:3001/store-order', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updateData),
                  });

                  clearCart();
                  navigate('/order-confirmation', { state: { orderId: orderData.orderId } });

                  toast({
                    title: 'Payment successful!',
                    description: `Your order #${orderData.orderId} has been confirmed and payment received.`,
                  });
                } else {
                  throw new Error('Payment verification failed');
                }
              } catch (verifyError) {
                console.error('Payment verification error:', verifyError);
                // Update order status to 'Payment Failed'
                const updateData = {
                  formType: 'order',
                  orderId: orderData.orderId,
                  order_status: 'Payment Failed',
                };

                await fetch('http://localhost:3001/store-order', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(updateData),
                });

                toast({
                  title: 'Payment verification failed',
                  description: 'Please contact support if amount was debited.',
                  variant: 'destructive',
                });
              }
            },
            modal: {
              ondismiss: async () => {
                // Payment cancelled - update order status
                const updateData = {
                  formType: 'order',
                  orderId: orderData.orderId,
                  order_status: 'Payment Cancelled',
                };

                await fetch('http://localhost:3001/store-order', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(updateData),
                });

                toast({
                  title: 'Payment cancelled',
                  description: 'You can try again or choose COD.',
                  variant: 'destructive',
                });
              },
            },
            theme: {
              color: '#059669', // Primary green color
            },
          };

          const rzp = new (window as any).Razorpay(options);
          rzp.open();
        } catch (razorpayError) {
          console.error('Razorpay error:', razorpayError);
          // Update order status to 'Payment Failed'
          const updateData = {
            formType: 'order',
            orderId: orderData.orderId,
            order_status: 'Payment Failed',
          };

          await fetch('http://localhost:3001/store-order', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData),
          });

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
