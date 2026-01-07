import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CheckCircle, Users, Award, Leaf, Heart, Truck } from 'lucide-react';
import heroImage from '@/assets/hero-bg.jpg';
import arjunPhoto from '@/assets/arjun_photo.png';

const About = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-background min-h-[60vh] flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={heroImage}
            alt="Golden Harvest Farms"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative w-full px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-primary mb-6 animate-fade-in drop-shadow-sm">
              About Golden Harvest
            </h1>
            <p className="text-xl md:text-2xl text-foreground mb-8 animate-fade-in-delay font-serif font-semibold">
              Connecting India's farmers directly to your kitchen with pure, natural nutrition.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-2">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/shop">Shop Our Products</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                <Link to="/testimonials">Read Stories</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-background animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-slide-in-left">
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
                  Our Journey
                </h2>
                <p className="text-lg text-foreground/80 leading-relaxed mb-6">
                  Golden harvest is not just a brand it is a journey born from struggle, belief and purpose. I am Arjun Kumar Bandari, raised in a simple rural family where hard work was a way of life. My parents may not be educated but they taught me the true value of effort, honesty and resilience.
                </p>
                <p className="text-lg text-foreground/80 leading-relaxed mb-6">
                  The idea behind Golden Harvest came as I observed the food market: one truth became impossible to ignore—many products labelled as healthy were filled with chemicals and preservatives. The most powerful question arose: can we provide nutrition in its purest, most natural form?
                </p>
                <p className="text-lg text-foreground/80 leading-relaxed mb-6">
                  The question became the turning point, transforming a vision into reality. The journey was not easy, but our one principle never changed: 1. No compromise on quality, 2. No chemicals, 3. No preservatives. Only pure fruits and vegetables, nothing else.
                </p>
                <p className="text-lg text-foreground/80 leading-relaxed mb-6">
                  Why the name Golden Harvest? Golden = premium quality and trust, and Harvest = hard work of farmers. Our mission is simple: To bring nature's goodness directly from farms to kitchens without any manipulation.
                </p>
                <p className="text-lg text-foreground/80 leading-relaxed mb-6">
                  Our products: We carefully produce raw powders from Banana, carrot, beetroot, lemon, curry leaves, moringa, papaya leaf, coconut, tomato, and more. Each product made with specific purpose.
                </p>
                <p className="text-lg text-foreground/80 leading-relaxed mb-6">
                  At Golden Harvest, profit is never placed above people. It stands for: trust, purity, honesty. This is not just a business—it is my identity and commitment to healthier families and a better future.
                </p>
                <p className="text-lg text-foreground/80 leading-relaxed mb-8">
                  Our vision: 1. To create employment in rural areas, 2. Support farmers by giving fair value, 3. Make healthy nutrition accessible to every Indian kitchen. We invite you to be a part of this journey from our family to yours. Thank you.
                </p>
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <Link to="/shop">Explore Our Range</Link>
                </Button>
              </div>
              <div className="relative animate-slide-in-right">
                <div className="aspect-[3/4] bg-muted rounded-2xl overflow-hidden shadow-2xl max-w-sm mx-auto">
                  <img
                    src={arjunPhoto}
                    alt="Farmers harvesting fresh produce"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-lg shadow-lg border">
                  <p className="text-sm font-medium text-primary">"Fresh from nature, pure for you"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20 bg-warm-beige animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-center text-primary mb-16">
              Our Process
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-muted bg-muted/50 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Leaf className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-primary mb-4">Harvest</h3>
                  <p className="text-foreground/70 leading-relaxed">
                    Fresh produce is harvested at peak ripeness from our partner farms across India, ensuring maximum nutritional value.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-muted bg-muted/50 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Award className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-primary mb-4">Process</h3>
                  <p className="text-foreground/70 leading-relaxed">
                    Using traditional methods combined with modern technology, we gently process the produce to retain natural nutrients.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-muted bg-muted/50 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Truck className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-primary mb-4">Deliver</h3>
                  <p className="text-foreground/70 leading-relaxed">
                    Pure, natural powders are packaged and delivered directly to your doorstep with our commitment to quality.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-background animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-center text-primary mb-16">
              Our Values
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-muted bg-muted/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <Heart className="w-8 h-8 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-primary mb-4">Purity First</h3>
                      <p className="text-foreground/70 leading-relaxed mb-4">
                        No artificial colors, preservatives, or fillers. Just pure, natural ingredients processed with the utmost care to maintain their nutritional integrity.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-foreground/70">100% natural ingredients</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-foreground/70">No chemical additives</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-foreground/70">Lab-tested purity</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-muted bg-muted/50 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <Users className="w-8 h-8 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-primary mb-4">Farmer Partnership</h3>
                      <p className="text-foreground/70 leading-relaxed mb-4">
                        We work directly with farmers across India, ensuring fair prices and supporting sustainable farming practices that benefit both farmers and consumers.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-foreground/70">Direct farmer sourcing</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-foreground/70">Fair trade practices</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-foreground/70">Sustainable farming</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary text-primary-foreground animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Experience Pure Nutrition Today
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of health-conscious families who trust Golden Harvest for their daily nutrition needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link to="/shop">Start Shopping</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-accent text-accent hover:bg-accent/10">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
