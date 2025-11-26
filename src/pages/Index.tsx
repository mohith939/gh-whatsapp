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
      <section className="relative bg-background">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src={heroImage} 
            alt="Fresh natural produce" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-6">
              Raw. Real. Truly Pure.
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 mb-8">
              Clean, raw, chemical-free powders made from fresh farm produce — naturally pure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/shop">Shop Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                <Link to="/about">Our Story</Link>
              </Button>
            </div>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3 justify-center mt-12">
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
      <section className="py-16 bg-warm-beige">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-primary mb-12">
            Why Golden Harvest?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
              <Card key={index} className="border-border bg-card">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-primary mb-2">{feature.title}</h3>
                  <p className="text-sm text-foreground/70">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
              Featured Products
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto">
              Discover our most popular raw powders, loved by health-conscious families across India.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredProducts.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`}>
                <Card className="h-full hover:shadow-lg transition-shadow border-border bg-card group">
                  <CardContent className="p-6">
                    <div className="aspect-square bg-muted rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                      <img 
                        src={product.imageUrl} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-primary mb-2">{product.name}</h3>
                    <p className="text-sm text-foreground/70 mb-4 line-clamp-2">{product.shortDescription}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-primary font-bold">₹{product.variants[0].price}</span>
                      <span className="text-xs text-foreground/60">{product.variants[0].weight}</span>
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
      </section>

      {/* Village Story */}
      <section className="py-16 bg-warm-beige">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">
              From Our Villages to Your Home
            </h2>
            <p className="text-foreground/80 leading-relaxed mb-6">
              Golden Harvest was born from a vision to bring the pure, unadulterated goodness of fresh farm produce directly to your kitchen. 
              Working closely with farmers in rural India, we transform fresh vegetables, fruits, and herbs into nutrient-rich powders that 
              retain their natural benefits.
            </p>
            <p className="text-foreground/80 leading-relaxed mb-8">
              Every product tells a story of dedication, purity, and tradition — connecting you to the source of true nutrition.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link to="/about">Read Our Full Story</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-primary mb-12">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Energy', 'Immunity', 'Digestion', 'Beauty', 'Daily Nutrition', 'Kids Nutrition', 'Wellness', 'Cooking Essentials'].map((category) => (
              <Link key={category} to={`/shop?category=${encodeURIComponent(category)}`}>
                <Card className="hover:shadow-md transition-shadow border-border bg-card">
                  <CardContent className="p-6 text-center">
                    <h3 className="font-semibold text-primary">{category}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Ready to Experience Pure Nutrition?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Order now with Cash on Delivery. Free shipping across India on orders above ₹500.
          </p>
          <Button asChild size="lg" variant="secondary" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link to="/shop">Start Shopping</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
