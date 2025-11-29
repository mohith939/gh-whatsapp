import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const navigate = useNavigate();
  const shippingThreshold = 500;
  const subtotal = getCartTotal();
  const shippingCost = subtotal >= shippingThreshold ? 0 : 50;
  const total = subtotal + shippingCost;

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
          <div className="lg:col-span-2 space-y-4 animate-fade-in-delay">
            {cartItems.map((item) => (
              <Card key={`${item.product.id}-${item.variant.weight}`} className="border-muted bg-muted/50 hover:shadow-md hover:scale-105 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={item.product.imageUrl} 
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-primary mb-1">{item.product.name}</h3>
                      <p className="text-sm text-foreground/60 mb-2">{item.variant.weight}</p>
                      <p className="text-lg font-bold text-primary">₹{item.variant.price}</p>
                    </div>

                    <div className="flex flex-col items-end justify-between">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.product.id, item.variant.weight)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.product.id, item.variant.weight, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="h-8 w-8"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.product.id, item.variant.weight, item.quantity + 1)}
                          disabled={item.quantity >= item.variant.stock}
                          className="h-8 w-8"
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
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-foreground/80">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-foreground/80">
                    <span>Shipping</span>
                    <span>{shippingCost === 0 ? 'Free' : `₹${shippingCost}`}</span>
                  </div>
                  {subtotal < shippingThreshold && (
                    <p className="text-xs text-foreground/60">
                      Add ₹{(shippingThreshold - subtotal).toFixed(2)} more for free shipping
                    </p>
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
                    Cash on Delivery Available<br />
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
