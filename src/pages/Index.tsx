import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Leaf, Award, Users } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { getFeaturedProducts } from '@/data/products';
import heroImage from '@/assets/hero-bg.jpg';
import arjunPhoto from '@/assets/arjun_photo.png';
import fassiCert from '@/assets/Certificates/fassi.avif';
import gmpCert from '@/assets/Certificates/gmp.avif';
import isoCert from '@/assets/Certificates/iso.avif';
import flakesImage from '@/assets/coconut-powder.jpg';
import fruitPowdersImage from '@/assets/amla-powder.jpg';
import vegetablePowderImage from '@/assets/carrot-powder.jpg';
import leafyVegetablePowderImage from '@/assets/spinach-powder.jpg';
import flowerPowdersImage from '@/assets/turmeric-powder.jpg';
import Autoplay from 'embla-carousel-autoplay';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

const instagramReels = [
  {
    permalink: 'https://www.instagram.com/reel/DIlgU4losxD/',
  },
  {
    permalink: 'https://www.instagram.com/reel/DKB7rLUROSu/',
  },
  {
    permalink: 'https://www.instagram.com/reel/DIYJeJltW36',
  },
];

const fieldTestimonials = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    location: 'Farmer, Uttar Pradesh',
    text: 'For generations, our family has grown these vegetables with love and care. Golden Harvest helps us share our harvest with families across India, ensuring our traditional farming methods reach modern kitchens. It\'s not just business — it\'s preserving our way of life.',
    icon: Users,
  },
  {
    id: 2,
    name: 'Meera Singh',
    location: 'Farmer, Rajasthan',
    text: 'Working with Golden Harvest has been a blessing. They value our organic farming practices and pay fair prices. Our turmeric and amla are now reaching health-conscious families everywhere.',
    icon: Leaf,
  },
  {
    id: 3,
    name: 'Arun Patel',
    location: 'Farmer, Gujarat',
    text: 'The partnership with Golden Harvest has transformed our small farm. Their commitment to quality and sustainability matches our own values. We\'re proud to be part of this pure journey.',
    icon: Award,
  },
  {
    id: 4,
    name: 'Sunita Devi',
    location: 'Farmer, Bihar',
    text: 'Golden Harvest understands the heart of farming. They support our traditional methods while ensuring our produce reaches those who appreciate real, natural nutrition.',
    icon: CheckCircle,
  },
];

const Index = () => {
  const featuredProductsRaw = getFeaturedProducts();
  const featuredProducts = [...featuredProductsRaw];
  const beetrootIndex = featuredProducts.findIndex(p => p.name === 'Beetroot Powder');
  const moringaIndex = featuredProducts.findIndex(p => p.name === 'Moringa Leaf Powder');
  if (beetrootIndex !== -1 && moringaIndex !== -1) {
    [featuredProducts[beetrootIndex], featuredProducts[moringaIndex]] = [featuredProducts[moringaIndex], featuredProducts[beetrootIndex]];
  }

  useEffect(() => {
    const processEmbeds = () => {
      if (typeof window !== 'undefined' && (window as any).instgrm?.Embeds) {
        (window as any).instgrm.Embeds.process();
      }
    };

    // Process embeds immediately
    processEmbeds();

    // Process with increasing delays to handle slow loading
    const timers = [
      setTimeout(processEmbeds, 500),
      setTimeout(processEmbeds, 1000),
      setTimeout(processEmbeds, 2000),
      setTimeout(processEmbeds, 5000),
      setTimeout(processEmbeds, 10000)
    ];

    // Process when window loads
    const handleLoad = () => {
      setTimeout(processEmbeds, 1000);
    };
    window.addEventListener('load', handleLoad);

    // Process when DOM content is loaded
    const handleDOMContentLoaded = () => {
      setTimeout(processEmbeds, 500);
    };
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
    } else {
      handleDOMContentLoaded();
    }

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener('load', handleLoad);
      document.removeEventListener('DOMContentLoaded', handleDOMContentLoaded);
    };
  }, []);

  // Structured data for organization
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Golden Harvest",
    "description": "Raw, real, truly pure powders made from fresh farm produce. Clean, chemical-free powders sourced directly from farmers across India.",
    "url": "https://www.ghrawpowders.com",
    "logo": "https://www.ghrawpowders.com/company_logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-XXXXXXXXXX",
      "contactType": "customer service"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://www.instagram.com/goldenharvestrawpowders"
    ]
  };

  // Structured data for featured products
  const productSchemas = featuredProducts.map(product => ({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.shortDescription,
    "image": product.imageUrl,
    "offers": {
      "@type": "Offer",
      "price": product.variants[0].price,
      "priceCurrency": "INR",
      "priceValidUntil": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Valid for 1 year
      "availability": "https://schema.org/InStock",
      "shippingDetails": {
        "@type": "OfferShippingDetails",
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
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Health Conscious Customer"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "Excellent quality natural powder. Very satisfied with the purity and taste."
      }
    ]
  }));

  return (
    <>
      <Helmet>
        {/* Basic Meta Tags */}
        <title>Golden Harvest Raw Powders - Pure Natural Fruit & Vegetable Powders Direct from Farmers</title>
        <meta name="description" content="Golden Harvest raw powders - Pure, chemical-free fruit and vegetable powders sourced directly from Indian farmers. Lab-tested purity, free shipping above ₹500. Cash on Delivery available." />
        <meta name="keywords" content="golden harvest, golden harvest raw powders, ghrawpowders, natural powders, fruit powders, vegetable powders, organic powders, raw powders, chemical-free, farmers direct, Indian spices, health supplements, pure nutrition" />
        <meta name="author" content="Golden Harvest" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.ghrawpowders.com" />

        {/* Open Graph Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Golden Harvest Raw Powders - Pure Natural Fruit & Vegetable Powders Direct from Farmers" />
        <meta property="og:description" content="Golden Harvest raw powders - Clean, chemical-free powders made from fresh farm produce. Direct from farmers, lab-tested purity. Free shipping across India." />
        <meta property="og:url" content="https://www.ghrawpowders.com" />
        <meta property="og:image" content="https://www.ghrawpowders.com/Home Page Background.png" />
        <meta property="og:image:alt" content="Golden Harvest Raw Powders - Pure Natural Powders" />
        <meta property="og:site_name" content="Golden Harvest" />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Golden Harvest Raw Powders - Pure Natural Fruit & Vegetable Powders Direct from Farmers" />
        <meta name="twitter:description" content="Golden Harvest raw powders - Clean, chemical-free powders made from fresh farm produce. Direct from farmers, lab-tested purity." />
        <meta name="twitter:image" content="https://www.ghrawpowders.com/Home Page Background.png" />
        <meta name="twitter:image:alt" content="Golden Harvest Raw Powders - Pure Natural Powders" />

        {/* Google Site Verification */}
        <meta name="google-site-verification" content="googleaa3057599185d29b.html" />

        {/* Additional SEO Tags */}
        <meta name="theme-color" content="#8B4513" />
        <meta name="msapplication-TileColor" content="#8B4513" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
        {productSchemas.map((schema, index) => (
          <script key={index} type="application/ld+json">
            {JSON.stringify(schema)}
          </script>
        ))}
      </Helmet>
      <div className="w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-background min-h-[80vh] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${heroImage})`,
            opacity: 0.2
          }}
        ></div>
        <div className="relative w-full px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-primary mb-6 animate-fade-in drop-shadow-sm">
              Raw. Real. Truly Pure.
            </h1>
            <p className="text-lg md:text-xl text-foreground mb-8 animate-fade-in-delay font-serif font-semibold">
              Clean, raw, chemical-free powders made from fresh farm produce naturally pure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-2">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/shop">Shop Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                <Link to="/about">Our Story</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Golden Harvest */}
      <section className="py-16 bg-warm-beige animate-fade-in">
        <div className="w-full px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-primary mb-12 drop-shadow-sm animate-slide-up">
              Why Golden Harvest?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  title: 'Direct from Farmers',
                  description: 'We source directly from trusted farmers, ensuring freshness and fair trade.'
                },
                {
                  title: 'Lab-tested Purity',
                  description: 'Every batch is tested for quality and purity in certified laboratories.'
                },
                {
                  title: 'No Additives',
                  description: 'Zero colors, preservatives, or fillers — just pure, natural ingredients.'
                },
                {
                  title: 'Trusted Across India',
                  description: 'Serving health-conscious families and businesses nationwide with COD delivery.'
                }
              ].map((feature, index) => (
                <Card key={index} className={`border-muted bg-muted/50 shadow-lg hover:shadow-md hover:scale-105 transition-all duration-300 animate-fade-in-delay-${index + 1}`}>
                  <CardContent className="p-6 text-center">
                    <h3 className="text-lg font-semibold text-primary mb-4">{feature.title}</h3>
                    <p className="text-foreground/70 leading-relaxed text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-background">
        <div className="w-full px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6 drop-shadow-sm">
                Featured Products
              </h2>
              <p className="text-foreground max-w-3xl mx-auto text-lg leading-relaxed">
                Discover our most popular raw powders, loved by health-conscious families across India.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
              {featuredProducts.map((product) => (
                <Link key={product.id} to={`/product/${product.id}`}>
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-border bg-card group hover:-translate-y-2">
                    <CardContent className="p-10">
                      <div className="aspect-square bg-muted rounded-lg mb-8 flex items-center justify-center overflow-hidden">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-primary mb-4">{product.name}</h3>
                      <p className="text-foreground/70 mb-8 line-clamp-2 leading-relaxed text-base">{product.shortDescription}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-sm text-muted-foreground line-through">₹{product.variants[0].originalPrice}</span>
                          <span className="text-primary font-bold text-xl">₹{product.variants[0].price}</span>
                          <span className="text-xs text-green-600 font-medium">{product.variants[0].discountPercentage}% off</span>
                        </div>
                        <span className="text-sm text-foreground/60">{product.variants[0].weight}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="text-center">
              <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10 px-8 py-4 h-auto">
                <Link to="/shop">View All Products</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Promotional Callouts */}
      <section className="py-20 bg-warm-beige animate-fade-in">
        <div className="w-full px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Bulk Order Special */}
              <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-in-left">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Award className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-primary mb-4">Bulk Orders Available</h3>
                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    Special pricing for restaurants, cafes, and retailers. Minimum 5 KG per product with custom packaging options.
                  </p>
                  <ul className="text-sm text-foreground/70 space-y-2 mb-6">
                    <li>• Special Pricing</li>
                    <li>• Personalized Service</li>
                    <li>• Fast Delivery</li>
                  </ul>
                  <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10">
                    <Link to="/bulk-inquiry">Request Quote</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* New Arrivals */}
              <Card className="border-secondary/20 bg-gradient-to-br from-secondary/5 to-secondary/10 shadow-lg hover:shadow-xl transition-all duration-300 animate-scale-in">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Leaf className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-primary mb-4">New Arrivals</h3>
                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    Discover our latest additions: Organic Neem Powder and Raw Papaya Powder, straight from this season's harvest.
                  </p>
                  <ul className="text-sm text-foreground/70 space-y-2 mb-6">
                    <li>• 100% Natural</li>
                    <li>• Fresh Harvest</li>
                    <li>• Lab Tested</li>
                  </ul>
                  <Button asChild className="bg-secondary hover:bg-secondary/90">
                    <Link to="/shop">Shop New Products</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Bundle Deals */}
              <Card className="border-accent/20 bg-gradient-to-br from-accent/5 to-accent/10 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-in-right">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-primary mb-4">Bundle & Save</h3>
                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    Mix and match your favorites! Get 15% off when you buy 3 or more different powders.
                  </p>
                  <ul className="text-sm text-foreground/70 space-y-2 mb-6">
                    <li>• 15% Discount</li>
                    <li>• Free Shipping</li>
                    <li>• Mix Any Products</li>
                  </ul>
                  <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent/10">
                    <Link to="/shop">Create Bundle</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Farmer Testimonials */}
      <section className="py-16 bg-background overflow-x-hidden">
        <div className="w-full px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-12 drop-shadow-sm">
              Voices from the Fields
            </h2>
            <div className="relative">
              <Carousel
                className="w-full max-w-4xl mx-auto"
                plugins={[
                  Autoplay({
                    delay: 5000,
                  }),
                ]}
                opts={{
                  loop: true,
                }}
              >
                <CarouselContent>
                  {fieldTestimonials.map((testimonial) => {
                    const IconComponent = testimonial.icon;
                    return (
                      <CarouselItem key={testimonial.id}>
                        <Card className="border-border bg-card shadow-xl">
                          <CardContent className="p-8 md:p-12">
                            <div className="flex flex-col items-center">
                              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                                <IconComponent className="w-8 h-8 text-primary" />
                              </div>
                              <blockquote className="text-lg md:text-xl text-foreground/80 leading-relaxed mb-6 italic">
                                "{testimonial.text}"
                              </blockquote>
                              <div className="text-center">
                                <p className="font-semibold text-primary">{testimonial.name}</p>
                                <p className="text-sm text-foreground/60">{testimonial.location}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
                <CarouselPrevious className="hidden sm:flex" />
                <CarouselNext className="hidden sm:flex" />
              </Carousel>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Reels */}
      <section className="py-12 bg-warm-beige">
        <div className="w-full px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-12 drop-shadow-sm">
              Follow Us on Instagram
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {instagramReels.map((reel, index) => (
                <div key={index} className="instagram-embed">
                  <blockquote
                    className="instagram-media"
                    data-instgrm-permalink={reel.permalink}
                    data-instgrm-version="14"
                    style={{ maxWidth: '540px', width: '100%', border: 'none' }}
                  >
                    <div style={{ padding: '16px' }}>
                      <a
                        href={reel.permalink}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#000', fontFamily: 'Arial,sans-serif', fontSize: '14px', fontStyle: 'normal', fontWeight: 'normal', lineHeight: '17px', textDecoration: 'none', wordWrap: 'break-word' }}
                      >
                        View this post on Instagram
                      </a>
                    </div>
                  </blockquote>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Scroller */}
      <section className="py-8 bg-primary overflow-hidden">
        <div className="w-full">
          <div className="animate-scroll flex space-x-48">
            {[
              fassiCert, gmpCert, isoCert,
              fassiCert, gmpCert, isoCert,
              fassiCert, gmpCert, isoCert,
              fassiCert, gmpCert, isoCert,
              fassiCert, gmpCert, isoCert,
              fassiCert, gmpCert, isoCert,
              fassiCert, gmpCert, isoCert,
              fassiCert, gmpCert, isoCert,
              fassiCert, gmpCert, isoCert,
              fassiCert, gmpCert, isoCert,
              fassiCert, gmpCert, isoCert,
              fassiCert, gmpCert, isoCert,
              fassiCert, gmpCert, isoCert,
              fassiCert, gmpCert, isoCert,
              fassiCert, gmpCert, isoCert,
              fassiCert, gmpCert, isoCert,
              fassiCert, gmpCert, isoCert,
              fassiCert, gmpCert, isoCert,
              fassiCert, gmpCert, isoCert,
              fassiCert, gmpCert, isoCert
            ].map((cert, index) => (
              <img key={index} src={cert} alt={`Certificate ${index + 1}`} className="h-32 object-contain flex-shrink-0" />
            ))}
          </div>
        </div>
      </section>



      {/* Categories */}
      <section className="py-20 bg-warm-beige">
        <div className="w-full px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-center text-primary mb-16 drop-shadow-sm">
              Shop by Category
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {[
                { name: 'Fruit Powders', image: fruitPowdersImage },
                { name: 'Vegetable Powder', image: vegetablePowderImage },
                { name: 'Leafy Vegetable Powder', image: leafyVegetablePowderImage }
              ].map((category) => (
                <Link key={category.name} to={`/shop?category=${encodeURIComponent(category.name)}`}>
                  <Card className="hover:shadow-lg transition-all duration-300 border-border bg-card hover:-translate-y-1 group">
                    <CardContent className="p-8 text-center">
                      <div className="aspect-square bg-muted rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <h3 className="font-semibold text-primary group-hover:text-primary/80 transition-colors">{category.name}</h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="w-full px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Ready to Experience Pure Nutrition?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Order now with Cash on Delivery. Free shipping across India on orders above ₹500.
            </p>
            <Button asChild size="lg" variant="secondary" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/shop">Start Shopping</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default Index;
