import { useEffect } from 'react';
import { useLocation, Link, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

const OrderConfirmation = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();
  const { toast } = useToast();
  
  // Get orderId from either state (desktop flow) or URL params (mobile redirect flow)
  const orderId = location.state?.orderId || searchParams.get('orderId');
  const paymentStatus = searchParams.get('payment_status');

  useEffect(() => {
    // If coming from mobile redirect flow (payment successful), clear cart and show toast
    if (paymentStatus === 'success' && orderId) {
      clearCart();
      toast({
        title: 'Payment successful!',
        description: 'Your order has been confirmed and payment received.',
      });
    }
  }, [paymentStatus, orderId, clearCart, toast]);

  // Determine if it was an online payment based on the URL parameter
  const isOnlinePayment = paymentStatus === 'success';

  return (
    <div className="w-full py-16">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto border-border">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-secondary" />
            </div>
            
            <h1 className="text-3xl font-serif font-bold text-primary mb-4">
              Thank You for Your Order!
            </h1>

            {orderId && (
              <p className="text-lg text-foreground/80 mb-6">
                Your order <span className="font-semibold">#{String(orderId).slice(0, 8)}</span> has been received successfully.
              </p>
            )}

            <div className="bg-warm-beige p-6 rounded-lg mb-6">
              <h2 className="font-semibold text-primary mb-3">Order Summary</h2>
              <p className="text-sm text-foreground/80 mb-4">
                Thank you for choosing Golden Harvest Raw Powders. We appreciate your business and are committed to providing you with the highest quality products.
              </p>
              <p className="text-sm text-foreground/80">
                You will be updated soon on WhatsApp with order tracking details and any important updates.
              </p>
            </div>

            <div className="bg-primary/5 p-6 rounded-lg mb-8">
              <h2 className="font-semibold text-primary mb-3">What happens next?</h2>
              <ul className="text-sm text-foreground/80 space-y-2 text-left">
                {isOnlinePayment ? (
                  <>
                    <li>• Your payment has been processed successfully</li>
                    <li>• Your order will be carefully packed and dispatched within 24-48 hours</li>
                    <li>• You will receive tracking details via SMS and WhatsApp</li>
                    <li>• Delivery typically takes 3-6 working days</li>
                  </>
                ) : (
                  <>
                    <li>• We will call you to confirm your COD order within 24 hours</li>
                    <li>• Your order will be carefully packed and dispatched within 24-48 hours</li>
                    <li>• You will receive tracking details via SMS and WhatsApp</li>
                    <li>• Pay in cash when you receive your order</li>
                    <li>• Delivery typically takes 3-6 working days</li>
                  </>
                )}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/shop">Continue Shopping</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary text-primary">
                <Link to="/">Back to Home</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderConfirmation;
