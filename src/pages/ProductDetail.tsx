import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';
import WheelGestures from 'embla-carousel-wheel-gestures';
import { products, type ProductVariant } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { CheckCircle, Star, Truck, Shield, Award, Minus, Plus } from 'lucide-react';
import { trackProductView, trackAddToCart } from '@/utils/analytics';
import { Helmet } from 'react-helmet-async';

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

  // Generate structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.longDescription,
    "image": product.imageUrls.length > 0 ? product.imageUrls : [product.imageUrl],
    "offers": {
      "@type": "Offer",
      "price": currentPrice,
      "priceCurrency": "INR",
      "priceValidUntil": "2027-07-07",
      "availability": "https://schema.org/InStock",
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": "0",
          "currency": "INR"
        },
        "shippingDestination": {
          "@type": "DefinedRegion",
          "addressCountry": "IN"
        }
      },
      "hasMerchantReturnPolicy": true
    },
    "brand": {
      "@type": "Brand",
      "name": "Golden Harvest"
    },
    ...(product.averageRating && {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": product.averageRating,
        "reviewCount": product.reviews?.length || 0,
        "bestRating": 5,
        "worstRating": 1
      }
    }),
    ...(product.reviews && product.reviews.length > 0 && {
      "review": product.reviews.map(review => ({
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": review.author
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": review.rating,
          "bestRating": 5
        },
        "reviewBody": review.comment
      }))
    })
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      <div className="w-full bg-background">
        <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
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
                          className="w-full h-[600px] object-cover rounded-2xl shadow-2xl"
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
                <div className="flex justify-center mt-6">
                  {product.imageUrls.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => api?.scrollTo(index)}
                      className={`w-3 h-3 rounded-full mx-2 transition-colors ${current === index ? 'bg-primary' : 'bg-muted-foreground/30'}`}
                    />
                  ))}
                </div>
              </>
            ) : (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-[600px] object-cover rounded-2xl shadow-2xl"
              />
            )}
          </div>

          {/* Right Column - Product Details */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">{product.name}</h1>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex flex-col">
                  <span className="text-xl text-muted-foreground line-through">₹{selectedVariant.originalPrice}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-4xl font-bold text-primary">₹{currentPrice}</span>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                      {selectedVariant.discountPercentage}% off
                    </Badge>
                  </div>
                </div>
                {product.averageRating && (
                  <div className="flex items-center gap-2">
                    <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-lg">{product.averageRating}</span>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-3 mb-6">
                {product.category.map((cat, idx) => (
                  <Badge key={idx} variant="secondary" className="text-sm px-3 py-1">{cat}</Badge>
                ))}
              </div>
              <p className="text-foreground/80 text-xl leading-relaxed mb-8">{product.shortDescription}</p>
            </div>

            {/* Variant Selector */}
            <div className="space-y-4">
              <label className="text-lg font-semibold text-primary">Select Size:</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {product.variants.map((variant) => {
                  const isSelected = selectedVariant.weight === variant.weight;
                  return (
                    <Button
                      key={variant.weight}
                      variant={isSelected ? "default" : "outline"}
                      onClick={() => setSelectedVariant(variant)}
                      className={`p-6 h-auto flex flex-col items-center space-y-2 transition-all duration-200 ${
                        isSelected ? 'shadow-lg scale-105' : 'hover:shadow-md'
                      }`}
                    >
                      <span className={`font-bold text-lg ${isSelected ? 'text-white' : 'text-primary'}`}>{variant.weight}</span>
                      <div className="text-center">
                        <span className={`text-sm line-through block ${isSelected ? 'text-white/80' : 'text-muted-foreground'}`}>₹{variant.originalPrice}</span>
                        <span className={`font-bold text-xl ${isSelected ? 'text-white' : 'text-primary'}`}>₹{variant.price}</span>
                        <Badge variant="secondary" className={`text-xs mt-1 ${isSelected ? 'bg-white text-primary' : 'bg-green-100 text-green-700'}`}>
                          {variant.discountPercentage}% off
                        </Badge>
                      </div>
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <label htmlFor="quantity" className="text-lg font-semibold text-primary">Quantity:</label>
                  <div className="flex items-center gap-3 bg-white dark:bg-gray-700 rounded-full px-4 py-2 shadow-md">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(quantity - 1)}
                      disabled={quantity <= 1}
                      className="h-8 w-8 rounded-full hover:bg-primary/10"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-10 text-center font-bold text-lg">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                      disabled={quantity >= 10}
                      className="h-8 w-8 rounded-full hover:bg-primary/10"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <Button onClick={handleAddToCart} size="lg" className="w-full py-8 text-xl font-semibold shadow-lg hover:shadow-xl transition-shadow">
                Add to Cart - ₹{currentPrice * quantity}
              </Button>
            </div>

            {/* Trust Signals */}
            <div className="grid grid-cols-2 gap-4 pt-8 border-t border-border">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <span className="text-sm font-medium text-foreground/80">Lab Tested</span>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="w-6 h-6 text-blue-600" />
                <span className="text-sm font-medium text-foreground/80">Fast Delivery</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-purple-600" />
                <span className="text-sm font-medium text-foreground/80">100% Pure</span>
              </div>
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-orange-600" />
                <span className="text-sm font-medium text-foreground/80">FSSAI Certified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="space-y-16">
          {/* About This Product */}
          <section className="bg-warm-beige rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6 drop-shadow-sm">
              About This Product
            </h2>
            <p className="text-foreground/90 leading-relaxed text-lg max-w-4xl">
              {product.longDescription}
            </p>
          </section>

          {/* Key Benefits */}
          <section className="bg-background rounded-2xl p-8 md:p-12 border border-border">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-8 drop-shadow-sm">
              Key Benefits
            </h2>
            <ul className="space-y-3">
              {product.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-foreground/90 text-base leading-relaxed">{benefit}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Usage Information */}
          <section className="bg-background rounded-2xl p-8 md:p-12 border border-border">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-8 drop-shadow-sm">
              Usage Information
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-serif font-bold text-primary mb-6">How to Use</h3>
                <p className="text-foreground/80 leading-relaxed text-base">
                  {product.usage}
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-serif font-bold text-primary mb-6">Recommended Dosage</h3>
                <div className="text-center">
                  <span className="text-4xl font-bold text-primary">{product.dosage}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Manufacturing & Safety */}
          <section className="bg-warm-beige rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-8 drop-shadow-sm">
              Manufacturing & Safety
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-primary mb-4">How It's Made</h3>
                <p className="text-foreground/80 leading-relaxed text-base">
                  {product.howItMade}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-primary mb-4">Safety Information</h3>
                <p className="text-foreground/80 leading-relaxed text-base">
                  {product.safety}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-primary mb-4">Storage</h3>
                <p className="text-foreground/80 leading-relaxed text-base">
                  {product.storage}
                </p>
              </div>
            </div>
          </section>

          {/* Product Highlights */}
          <section className="bg-background rounded-2xl p-8 md:p-12 border border-border">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-8 drop-shadow-sm">
              Product Highlights
            </h2>
            <div className="flex flex-wrap gap-4">
              {product.highlights.map((highlight, idx) => (
                <Badge key={idx} variant="secondary" className="px-6 py-3 text-lg font-medium bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20">
                  {highlight}
                </Badge>
              ))}
            </div>
          </section>

          {/* Bulk Orders */}
          <section className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-12">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                Bulk Orders Available
              </h2>
              <h3 className="text-xl md:text-2xl font-semibold mb-6 opacity-90">
                Premium-Grade Raw Powders for Large-Scale Requirements
              </h3>
              <p className="leading-relaxed text-lg mb-8 opacity-90">
                Golden Harvest Raw Powders is a trusted bulk supplier for brands and businesses looking for consistent quality, clean ingredients, and dependable service. We work closely with manufacturers, retailers, and food brands across India to deliver fresh, pure, and ethically sourced raw powders at scale.
              </p>
              <Button asChild size="lg" variant="secondary" className="px-8 py-4 text-lg font-semibold">
                <Link to="/bulk-inquiry">Contact for Bulk Orders</Link>
              </Button>
            </div>
          </section>
        </div>


      </div>
    </div>
  </>
  );
};

export default ProductDetail;
