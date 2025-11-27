import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Leaf, Award, Users } from 'lucide-react';
import { getFeaturedProducts } from '@/data/products';
import heroImage from '@/assets/hero-bg.jpg';

const Index = () => {
  const featuredProducts = getFeaturedProducts();

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
            <p className="text-xl md:text-2xl text-foreground mb-8 animate-fade-in-delay font-medium">
              Clean, raw, chemical-free powders made from fresh farm produce — naturally pure.
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
                <CheckCircle className="w-4 h-4 mr-2" />
                Lab Tested
              </Badge>
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 px-4 py-2">
                <Award className="w-4 h-4 mr-2" />
                FSSAI Certified
              </Badge>
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 px-4 py-2">
                <Leaf className="w-4 h-4 mr-2" />
                No Preservatives
              </Badge>
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 px-4 py-2">
                <Users className="w-4 h-4 mr-2" />
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
                <Card key={index} className="border-border bg-card shadow-lg hover:shadow-xl transition-shadow">
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
      <section className="py-20 bg-background">
        <div className="w-full px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4 drop-shadow-sm">
                Featured Products
              </h2>
              <p className="text-foreground max-w-2xl mx-auto text-lg">
                Discover our most popular raw powders, loved by health-conscious families across India.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredProducts.map((product) => (
                <Link key={product.id} to={`/product/${product.id}`}>
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-border bg-card group hover:-translate-y-2">
                    <CardContent className="p-8">
                      <div className="aspect-square bg-muted rounded-lg mb-6 flex items-center justify-center overflow-hidden">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-primary mb-3">{product.name}</h3>
                      <p className="text-foreground/70 mb-6 line-clamp-2 leading-relaxed">{product.shortDescription}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-primary font-bold text-lg">₹{product.variants[0].price}</span>
                        <span className="text-sm text-foreground/60">{product.variants[0].weight}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="text-center">
              <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10">
                <Link to="/shop">View All Products</Link>
              </Button>
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

      {/* Farmer Testimonial */}
      <section className="py-20 bg-background">
        <div className="w-full px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-12 drop-shadow-sm">
              Voices from the Fields
            </h2>
            <Card className="border-border bg-card shadow-xl">
              <CardContent className="p-8 md:p-12">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <blockquote className="text-lg md:text-xl text-foreground/80 leading-relaxed mb-6 italic">
                    "For generations, our family has grown these vegetables with love and care. Golden Harvest helps us share our harvest
                    with families across India, ensuring our traditional farming methods reach modern kitchens. It's not just business —
                    it's preserving our way of life."
                  </blockquote>
                  <div className="text-center">
                    <p className="font-semibold text-primary">Rajesh Kumar</p>
                    <p className="text-sm text-foreground/60">Farmer, Uttar Pradesh</p>
                  </div>
                </div>
              </CardContent>
            </Card>
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
