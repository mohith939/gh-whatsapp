import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCart } from '@/contexts/CartContext';
import { getProductById } from '@/data/products';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, Check, Heart, Clock, Shield, Factory, Minus, Plus, Star, Truck, Award, Users } from 'lucide-react';

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = productId ? getProductById(productId) : undefined;
  const [selectedVariant, setSelectedVariant] = useState(0);
  const { addToCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">Product not found</h1>
        <Button onClick={() => navigate('/shop')}>Back to Shop</Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, product.variants[selectedVariant], 1);
    toast({
      title: "Added to cart",
      description: `${product.name} (${product.variants[selectedVariant].weight}) added to your cart.`,
    });
  };

  return (
    <div className="w-full py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-foreground/60">
          <button onClick={() => navigate('/shop')} className="hover:text-primary">Shop</button>
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        {/* Single Column Layout */}
        <div className="max-w-4xl mx-auto">
          {/* Product Image and Purchase Section */}
          <div className="bg-background rounded-lg border border-muted p-6 mb-8 hover:shadow-md hover:scale-105 transition-all duration-300">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="aspect-square bg-muted rounded-lg overflow-hidden border border-border">
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col">
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4 animate-fade-in">
                  {product.name}
                </h1>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.highlights.map((highlight, idx) => (
                    <Badge key={idx} variant="secondary" className="bg-secondary/20 text-primary border-secondary">
                      {highlight}
                    </Badge>
                  ))}
                </div>

                <p className="text-base text-foreground/80 mb-6">{product.shortDescription}</p>

                {/* Weight Selection */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold mb-3 text-foreground">Select Pack Size:</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {product.variants.map((variant, idx) => (
                      <Card
                        key={variant.sku}
                        className={`cursor-pointer transition-all ${
                          selectedVariant === idx 
                            ? 'border-primary border-2 bg-primary/5' 
                            : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => setSelectedVariant(idx)}
                      >
                        <CardContent className="p-3 text-center">
                          <div className="font-semibold text-primary">{variant.weight}</div>
                          <div className="text-lg font-bold mt-1">₹{variant.price}</div>
                          <div className="text-xs text-foreground/60 mt-1">
                            {variant.stock > 0 ? `In Stock` : 'Out of Stock'}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Price and Add to Cart */}
                <div className="bg-muted/50 p-4 rounded-lg mt-auto">
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="text-2xl font-bold text-primary">
                      ₹{product.variants[selectedVariant].price}
                    </span>
                    <span className="text-foreground/60 text-sm">for {product.variants[selectedVariant].weight}</span>
                  </div>
                  <Button 
                    size="lg" 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={handleAddToCart}
                    disabled={product.variants[selectedVariant].stock === 0}
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart
                  </Button>
                  <p className="text-xs text-center text-foreground/60 mt-2">
                    Cash on Delivery available | Free shipping on orders above ₹500
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="benefits">Benefits & Usage</TabsTrigger>
              <TabsTrigger value="safety">Safety & Storage</TabsTrigger>
              <TabsTrigger value="reviews" disabled={!product.reviews || product.reviews.length === 0}>
                Reviews {product.reviews && product.reviews.length > 0 && `(${product.reviews.length})`}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  {/* Long Description */}
                  <div className="bg-card rounded-lg border border-border p-6">
                    <h2 className="text-2xl font-serif font-bold text-primary mb-4">About This Product</h2>
                    <p className="text-foreground/80 leading-relaxed">{product.longDescription}</p>
                  </div>

                  {/* How It's Made */}
                  <div className="bg-card rounded-lg border border-border p-6">
                    <h2 className="text-2xl font-serif font-bold text-primary mb-4 flex items-center">
                      <Factory className="w-6 h-6 mr-2 text-secondary" />
                      How It's Made
                    </h2>
                    <p className="text-foreground/80 whitespace-pre-line">{product.howItMade}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Categories */}
                  <div className="bg-muted/50 rounded-lg border border-muted p-6 hover:shadow-md hover:scale-105 transition-all duration-300">
                    <h2 className="text-2xl font-serif font-bold text-primary mb-4">Categories</h2>
                    <div className="flex flex-wrap gap-2">
                      {product.category.map((cat, idx) => (
                        <Badge key={idx} variant="outline" className="border-primary text-primary">
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="bg-muted/50 rounded-lg border border-muted p-6 hover:shadow-md hover:scale-105 transition-all duration-300">
                    <h2 className="text-2xl font-serif font-bold text-primary mb-4">Highlights</h2>
                    <div className="flex flex-wrap gap-2">
                      {product.highlights.map((highlight, idx) => (
                        <Badge key={idx} variant="secondary" className="bg-secondary/20 text-primary border-secondary">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="benefits" className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  {/* Benefits */}
                  <div className="bg-muted/50 rounded-lg border border-muted p-6 hover:shadow-md hover:scale-105 transition-all duration-300">
                    <h2 className="text-2xl font-serif font-bold text-primary mb-4 flex items-center">
                      <Heart className="w-6 h-6 mr-2 text-secondary" />
                      Benefits
                    </h2>
                    <ul className="space-y-3">
                      {product.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check className="w-5 h-5 text-secondary mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-foreground/80">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Usage */}
                  <div className="bg-card rounded-lg border border-border p-6">
                    <h2 className="text-2xl font-serif font-bold text-primary mb-4 flex items-center">
                      <Clock className="w-6 h-6 mr-2 text-secondary" />
                      Usage
                    </h2>
                    <p className="text-foreground/80">{product.usage}</p>
                  </div>

                  {/* Dosage */}
                  <div className="bg-card rounded-lg border border-border p-6">
                    <h2 className="text-2xl font-serif font-bold text-primary mb-4 flex items-center">
                      <Shield className="w-6 h-6 mr-2 text-secondary" />
                      Recommended Dosage
                    </h2>
                    <p className="text-foreground/80">{product.dosage}</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="safety" className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  {/* Safety Notes */}
                  <div className="bg-muted/50 rounded-lg border border-muted p-6 hover:shadow-md hover:scale-105 transition-all duration-300">
                    <h2 className="text-2xl font-serif font-bold text-primary mb-4 flex items-center">
                      <Shield className="w-6 h-6 mr-2 text-secondary" />
                      Safety Notes
                    </h2>
                    <p className="text-foreground/80">{product.safety}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Storage */}
                  <div className="bg-card rounded-lg border border-border p-6">
                    <h2 className="text-2xl font-serif font-bold text-primary mb-4 flex items-center">
                      <Factory className="w-6 h-6 mr-2 text-secondary" />
                      Storage Instructions
                    </h2>
                    <p className="text-foreground/80">{product.storage}</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-8">
              {product.reviews && product.reviews.length > 0 && (
                <div className="bg-card rounded-lg border border-border p-6">
                  <h2 className="text-2xl font-serif font-bold text-primary mb-6 flex items-center">
                    <Star className="w-6 h-6 mr-2 text-yellow-500" />
                    Customer Reviews ({product.reviews.length})
                  </h2>
                  <div className="space-y-6">
                    {product.reviews.map((review) => (
                      <div key={review.id} className="border-b border-border/50 pb-6 last:border-b-0 last:pb-0">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                              <Users className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-semibold text-primary">{review.author}</p>
                              <div className="flex items-center gap-2">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${
                                        i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                                      }`}
                                    />
                                  ))}
                                </div>
                                {review.verified && (
                                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                                    <Check className="w-3 h-3 mr-1" />
                                    Verified Purchase
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          <span className="text-sm text-foreground/60">{review.date}</span>
                        </div>
                        <p className="text-foreground/80 leading-relaxed">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
