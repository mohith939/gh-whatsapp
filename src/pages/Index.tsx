import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Leaf, Award, Users } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { getFeaturedProducts } from '@/data/products';
import heroImage from '@/assets/hero-bg.jpg';
import fassiCert from '@/assets/Certificates/fassi.avif';
import gmpCert from '@/assets/Certificates/gmp.avif';
import isoCert from '@/assets/Certificates/iso.avif';
import Autoplay from 'embla-carousel-autoplay';
import { useEffect } from 'react';

const instagramReels = [
  {
    permalink: 'https://www.instagram.com/p/DRmcqR6CAZK/',
  },
  {
    permalink: 'https://www.instagram.com/p/DRPiND2iExP/',
  },
  {
    permalink: 'https://www.instagram.com/p/DKOT8uJoGSj/',
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
  const featuredProducts = getFeaturedProducts();

  useEffect(() => {
    const processEmbeds = () => {
      if ((window as any).instgrm && (window as any).instgrm.Embeds) {
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

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-background min-h-screen flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={heroImage}
            alt="Fresh natural produce"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative w-full px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-primary mb-6 animate-fade-in drop-shadow-sm">
              Raw. Real. Truly Pure.
            </h1>
            <p className="text-xl md:text-2xl text-foreground mb-8 animate-fade-in-delay font-serif font-semibold">
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

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3 justify-center mt-12 animate-fade-in-delay-3">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 px-4 py-2">
                Lab Tested
              </Badge>
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 px-4 py-2">
                FSSAI Certified
              </Badge>
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 px-4 py-2">
                No Preservatives
              </Badge>
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 px-4 py-2">
                Direct from Farmers
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Why Golden Harvest */}
      <section className="py-20 bg-warm-beige">
        <div className="w-full px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-center text-primary mb-16 drop-shadow-sm">
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
                <Card key={index} className="border-muted bg-muted/50 shadow-lg hover:shadow-md hover:scale-105 transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <h3 className="text-xl font-semibold text-primary mb-4">{feature.title}</h3>
                    <p className="text-foreground/70 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-background">
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
                        <span className="text-primary font-bold text-xl">₹{product.variants[0].price}</span>
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
      <section className="py-20 bg-warm-beige">
        <div className="w-full px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Bulk Order Special */}
              <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 shadow-lg hover:shadow-xl transition-all duration-300">
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
              <Card className="border-secondary/20 bg-gradient-to-br from-secondary/5 to-secondary/10 shadow-lg hover:shadow-xl transition-all duration-300">
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
              <Card className="border-accent/20 bg-gradient-to-br from-accent/5 to-accent/10 shadow-lg hover:shadow-xl transition-all duration-300">
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

      {/* Village Story */}
      <section className="py-20 bg-warm-beige">
        <div className="w-full px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6 drop-shadow-sm">
                  From Our Villages to Your Home
                </h2>
                <p className="text-foreground/80 leading-relaxed mb-6 text-lg">
                  In the heart of rural India, where the soil is rich and the sun kisses the earth, our farmers cultivate with care and tradition.
                  Golden Harvest bridges the gap between these verdant fields and your modern kitchen, preserving the essence of nature's bounty.
                </p>
                <p className="text-foreground/80 leading-relaxed mb-8 text-lg">
                  Each powder carries the story of dedicated hands that nurture the land, ensuring that when you sprinkle our products into your meals,
                  you're not just adding nutrition — you're connecting with the timeless rhythm of Indian agriculture.
                </p>
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <Link to="/about">Read Our Full Story</Link>
                </Button>
              </div>
              <div className="relative">
                <div className="aspect-square bg-muted rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={heroImage}
                    alt="Farmers working in fields"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-lg shadow-lg border">
                  <p className="text-sm font-medium text-primary">"Pure from earth to table"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Farmer Testimonials */}
      <section className="py-20 bg-background">
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
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Reels */}
      <section className="py-20 bg-warm-beige">
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
      <section className="py-12 bg-primary overflow-hidden">
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {['Energy', 'Immunity', 'Digestion', 'Beauty', 'Daily Nutrition', 'Kids Nutrition', 'Wellness', 'Cooking Essentials'].map((category) => (
                <Link key={category} to={`/shop?category=${encodeURIComponent(category)}`}>
                  <Card className="hover:shadow-lg transition-all duration-300 border-border bg-card hover:-translate-y-1 group">
                    <CardContent className="p-8 text-center">
                      <h3 className="font-semibold text-primary group-hover:text-primary/80 transition-colors">{category}</h3>
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
  );
};

export default Index;
