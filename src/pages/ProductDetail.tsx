import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';
import WheelGestures from 'embla-carousel-wheel-gestures';
import { products } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { CheckCircle, Star, Truck, Shield, Award, Users } from 'lucide-react';
import { trackProductView, trackAddToCart } from '@/utils/analytics';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = products.find(p => p.id === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const currentPrice = selectedVariant.price;

  useEffect(() => {
    // Track product view
    trackProductView({
      id: product.id,
      name: product.name,
      category: product.category[0],
      price: currentPrice,
    });
  }, [product, currentPrice]);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity);
    // Track add to cart event
    trackAddToCart({
      id: product.id,
      name: product.name,
      category: product.category[0],
      price: currentPrice,
      quantity,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12 animate-fade-in">
          {/* Left Column - Image */}
          <div className="space-y-6">
            {product.imageUrls && product.imageUrls.length > 1 ? (
              <>
                <Carousel className="w-full" setApi={setApi} plugins={[WheelGestures()]}>
                  <CarouselContent>
                    {product.imageUrls.map((imageUrl, index) => (
                      <CarouselItem key={index}>
                        <img
                          src={imageUrl}
                          alt={`${product.name} - Image ${index + 1}`}
                          className="w-full h-[500px] object-cover rounded-xl shadow-xl"
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
                <div className="flex justify-center mt-4">
                  {product.imageUrls.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => api?.scrollTo(index)}
                      className={`w-1 h-1 rounded-full mx-1 ${current === index ? 'bg-primary' : 'bg-gray-300'}`}
                    />
                  ))}
                </div>
              </>
            ) : (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-[500px] object-cover rounded-xl shadow-xl"
              />
            )}
          </div>

          {/* Right Column - Price, Add to Cart, etc. */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-primary mb-3">{product.name}</h1>
              <div className="flex items-center gap-3 mb-4">
                <p className="text-3xl font-bold text-primary">₹{currentPrice}</p>
                {product.averageRating && (
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{product.averageRating}</span>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {product.category.map((cat, idx) => (
                  <Badge key={idx} variant="secondary">{cat}</Badge>
                ))}
              </div>
              <p className="text-foreground/80 text-lg leading-relaxed mb-6">{product.shortDescription}</p>

              {/* Variant Selector */}
              <div className="space-y-3 mb-6">
                <label className="text-sm font-medium">Select Size:</label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant) => (
                    <Button
                      key={variant.weight}
                      variant={selectedVariant.weight === variant.weight ? "default" : "outline"}
                      onClick={() => setSelectedVariant(variant)}
                      className="px-4 py-2 text-sm"
                    >
                      {variant.weight} - ₹{variant.price}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center space-x-4 mb-6">
                <label htmlFor="quantity" className="text-sm font-medium">Quantity:</label>
                <select
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="border border-border rounded px-4 py-2 bg-background"
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>

              {/* Add to Cart Button */}
              <Button onClick={handleAddToCart} className="w-full py-6 text-lg font-semibold mb-6">
                Add to Cart - ₹{currentPrice * quantity}
              </Button>

              {/* Trust Signals */}
              <div className="grid grid-cols-2 gap-3">
                <Card className="p-3 border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
                  <CardContent className="p-0">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                      <span className="text-sm font-medium text-green-800 dark:text-green-200">Lab Tested</span>
                    </div>
                  </CardContent>
                </Card>
                <Card className="p-3 border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
                  <CardContent className="p-0">
                    <div className="flex items-center space-x-2">
                      <Truck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm font-medium text-blue-800 dark:text-blue-200">Fast Delivery</span>
                    </div>
                  </CardContent>
                </Card>
                <Card className="p-3 border-purple-200 bg-purple-50 dark:bg-purple-950 dark:border-purple-800">
                  <CardContent className="p-0">
                    <div className="flex items-center space-x-2">
                      <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      <span className="text-sm font-medium text-purple-800 dark:text-purple-200">100% Pure</span>
                    </div>
                  </CardContent>
                </Card>
                <Card className="p-3 border-orange-200 bg-orange-50 dark:bg-orange-950 dark:border-orange-800">
                  <CardContent className="p-0">
                    <div className="flex items-center space-x-2">
                      <Award className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                      <span className="text-sm font-medium text-orange-800 dark:text-orange-200">FSSAI Certified</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Section - Below Image */}
        <div className="space-y-12 mb-12 animate-fade-in">
          {/* Product Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* About This Product */}
            {product.longDescription && (
              <Card className="p-6 bg-amber-50 dark:bg-amber-950 dark:border-amber-800">
                <h2 className="text-2xl font-bold text-primary mb-4">About This Product</h2>
                <p className="text-foreground/80 leading-relaxed">{product.longDescription}</p>
              </Card>
            )}

            {/* Key Benefits */}
            {product.benefits && product.benefits.length > 0 && (
              <Card className="p-6 bg-amber-50 dark:bg-amber-950 dark:border-amber-800">
                <h2 className="text-2xl font-bold text-primary mb-4">Key Benefits</h2>
                <ul className="space-y-3">
                  {product.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-foreground/80 text-lg">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </div>

          {/* Usage Guide */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* How to Use */}
            {product.usage && (
              <Card className="p-6 bg-amber-50 dark:bg-amber-950 dark:border-amber-800">
                <h2 className="text-2xl font-bold text-primary mb-4">How to Use</h2>
                <div className="text-foreground/80 leading-relaxed whitespace-pre-line text-lg">
                  {product.usage}
                </div>
              </Card>
            )}

            {/* Recommended Dosage */}
            {product.dosage && (
              <Card className="p-6 bg-amber-50 dark:bg-amber-950 dark:border-amber-800">
                <h2 className="text-2xl font-bold text-primary mb-4">Recommended Dosage</h2>
                <div className="text-foreground/80 leading-relaxed whitespace-pre-line text-lg">
                  {product.dosage}
                </div>
              </Card>
            )}
          </div>

          {/* Manufacturing & Safety */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* How It's Made */}
            {product.howItMade && (
              <Card className="p-6 bg-amber-50 dark:bg-amber-950 dark:border-amber-800">
                <h2 className="text-2xl font-bold text-primary mb-4">How It's Made</h2>
                <div className="text-foreground/80 leading-relaxed whitespace-pre-line text-lg">
                  {product.howItMade}
                </div>
              </Card>
            )}

            {/* Safety Information */}
            {product.safety && (
              <Card className="p-6 bg-amber-50 dark:bg-amber-950 dark:border-amber-800">
                <h2 className="text-2xl font-bold text-primary mb-4">Safety Information</h2>
                <div className="text-foreground/80 leading-relaxed whitespace-pre-line text-lg">
                  {product.safety}
                </div>
              </Card>
            )}

            {/* Storage */}
            {product.storage && (
              <Card className="p-6 bg-amber-50 dark:bg-amber-950 dark:border-amber-800">
                <h2 className="text-2xl font-bold text-primary mb-4">Storage</h2>
                <p className="text-foreground/80 leading-relaxed text-lg">{product.storage}</p>
              </Card>
            )}
          </div>

          {/* Product Highlights */}
          {product.highlights && product.highlights.length > 0 && (
            <Card className="p-6 bg-amber-50 dark:bg-amber-950 dark:border-amber-800">
              <h2 className="text-2xl font-bold text-primary mb-4">Product Highlights</h2>
              <div className="flex flex-wrap gap-3">
                {product.highlights.map((highlight, idx) => (
                  <Badge key={idx} variant="outline" className="px-4 py-2 text-lg bg-primary/10 border-primary/20">
                    {highlight}
                  </Badge>
                ))}
              </div>
            </Card>
          )}

          {/* Bulk Orders */}
          <Card className="p-6 bg-amber-50 dark:bg-amber-950 dark:border-amber-800">
            <h2 className="text-2xl font-bold text-primary mb-4">Bulk Orders – Partner With Golden Harvest Raw Powders</h2>
            <h3 className="text-xl font-semibold text-primary mb-3">Premium-Grade Raw Powders for Large-Scale Requirements</h3>
            <p className="text-foreground/80 leading-relaxed text-lg mb-4">
              Golden Harvest Raw Powders is a trusted bulk supplier for brands and businesses looking for consistent quality, clean ingredients, and dependable service. We work closely with manufacturers, retailers, and food brands across India to deliver fresh, pure, and ethically sourced raw powders at scale.
            </p>
            <Button variant="outline" className="bg-white dark:bg-gray-800">
              Contact for Bulk Orders
            </Button>
          </Card>
        </div>

        {/* Trust Footer */}
        <Card className="p-6 bg-muted/50">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-center">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-sm text-foreground/70">Trusted by 500+ businesses across India</span>
            </div>
            <Separator orientation="vertical" className="hidden md:block h-6" />
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-foreground/70">4.8/5 rating from verified customers</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetail;
