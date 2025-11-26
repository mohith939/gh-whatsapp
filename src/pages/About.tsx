import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  return (
    <div className="w-full py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6 text-center">About Golden Harvest</h1>
          
          <Card className="border-border mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold text-primary mb-4">Our Mission</h2>
              <p className="text-foreground/80 leading-relaxed mb-6">
                Golden Harvest was founded with a simple yet powerful vision: to bring the pure, unadulterated goodness of fresh farm produce directly to your kitchen. We believe that true nutrition comes from nature, not from laboratories.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Working closely with farmers across rural India, we transform fresh vegetables, fruits, and herbs into nutrient-rich powders that retain their natural benefits. Every product tells a story of dedication, purity, and tradition — connecting you to the source of true nutrition.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold text-primary mb-4">Our Values</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-primary mb-2">Purity</h3>
                  <p className="text-foreground/70">No colors, preservatives, or fillers. Just pure, natural ingredients processed with care.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-2">Transparency</h3>
                  <p className="text-foreground/70">Lab-tested quality. FSSAI certified. Every batch is tested for purity and safety.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-2">Farmer-First</h3>
                  <p className="text-foreground/70">Direct sourcing ensures fair prices for farmers and fresh produce for you.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-2">Quality</h3>
                  <p className="text-foreground/70">From farm to powder, we maintain the highest standards at every step.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
