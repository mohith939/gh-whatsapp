import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Minus, Plus, Trash2, ShoppingBag, Tag } from 'lucide-react';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const shippingThreshold = 500;
  const subtotal = getCartTotal();
  const shippingCost = subtotal >= shippingThreshold ? 0 : 50;
  const total = subtotal + shippingCost - appliedDiscount;

  const applyDiscount = () => {
    if (discountCode.toUpperCase() === 'GH06') {
      const discountAmount = (subtotal + shippingCost) * 0.10;
      setAppliedDiscount(discountAmount);
      toast({
        title: "Discount Applied",
        description: "10% discount has been applied to your order!",
        variant: "default"
      });
    } else {
      toast({
        title: "Invalid Code",
        description: "Please enter a valid discount code.",
        variant: "destructive"
      });
      setAppliedDiscount(0);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="w-full py-16">
        <div className="container mx-auto px-4 text-center">
          <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-3xl font-serif font-bold text-primary mb-4 animate-fade-in">Your Cart is Empty</h1>
          <p className="text-foreground/70 mb-8 animate-fade-in-delay">Add some products to get started!</p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <Link to="/shop">Browse Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-8 animate-fade-in">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6 animate-fade-in-delay">
            {cartItems.map((item) => (
              <Card key={`${item.product.id}-${item.variant.weight}`} className="border-0 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex gap-6">
                    <div className="w-28 h-28 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl overflow-hidden flex-shrink-0 shadow-md">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-primary mb-2">{item.product.name}</h3>
                      <p className="text-sm text-foreground/70 mb-3 bg-primary/10 px-3 py-1 rounded-full inline-block">{item.variant.weight}</p>
                      <p className="text-xl font-bold text-primary">₹{item.variant.price}</p>
                    </div>

                    <div className="flex flex-col items-end justify-between">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.product.id, item.variant.weight)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950 rounded-full"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>

                      <div className="flex items-center gap-3 bg-white dark:bg-gray-700 rounded-full px-4 py-2 shadow-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => updateQuantity(item.product.id, item.variant.weight, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="h-8 w-8 rounded-full hover:bg-primary/10"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-10 text-center font-bold text-lg">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => updateQuantity(item.product.id, item.variant.weight, item.quantity + 1)}
                          disabled={item.quantity >= item.variant.stock}
                          className="h-8 w-8 rounded-full hover:bg-primary/10"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <Card className="border-border sticky top-20">
              <CardContent className="p-6">
                <h2 className="text-xl font-serif font-bold text-primary mb-6">Order Summary</h2>
                
                {/* Discount Code */}
                <div className="space-y-2 mb-4">
                  <Label htmlFor="discount_code" className="flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    Discount Code
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="discount_code"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      placeholder="Enter discount code"
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    />
                    <Button
                      variant="outline"
                      onClick={applyDiscount}
                      disabled={!discountCode.trim()}
                      className="px-4"
                    >
                      Apply
                    </Button>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-foreground/80">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-foreground/80">
                    <span>Shipping</span>
                    <span>Shipping charges will calculate at checkout</span>
                  </div>
                  {appliedDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-₹{appliedDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t border-border pt-3">
                    <div className="flex justify-between text-lg font-bold text-primary">
                      <span>Total</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 mb-3"
                  onClick={() => navigate('/checkout')}
                >
                  Proceed to Checkout
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="w-full border-primary text-primary hover:bg-primary/10"
                  asChild
                >
                  <Link to="/shop">Continue Shopping</Link>
                </Button>

                <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                  <p className="text-sm text-foreground/70 text-center">
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

export default Cart;
