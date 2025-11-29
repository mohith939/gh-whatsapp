import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const collaborations = [
  {
    id: 1,
    name: 'Organic India Partnership',
    logo: null,
    description: 'Partnering with Organic India to promote sustainable farming practices and provide premium raw powders to health-conscious consumers.',
    link: '#',
    featured: true,
  },
  {
    id: 2,
    name: 'Ayurveda Foundation',
    logo: null,
    description: 'Collaborating with leading Ayurvedic practitioners to ensure our products meet traditional quality standards.',
    link: '#',
    featured: true,
  },
  {
    id: 3,
    name: 'Local Farmers Collective',
    logo: null,
    description: 'Direct partnerships with over 100+ farmers across rural India to source the freshest produce at fair prices.',
    link: '#',
    featured: true,
  },
  {
    id: 4,
    name: 'Health Food Retailers',
    logo: null,
    description: 'Supply partnership with leading health food stores and organic retail chains across India.',
    link: '#',
    featured: false,
  },
  {
    id: 5,
    name: 'Wellness Centers',
    logo: null,
    description: 'Trusted supplier for nutrition and wellness centers promoting natural health solutions.',
    link: '#',
    featured: false,
  },
];

const Collaborations = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    slidesToScroll: 1,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="w-full py-12">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4 drop-shadow-sm animate-fade-in">
            Our Partners & Collaborations
          </h1>
          <p className="text-foreground text-lg max-w-2xl mx-auto">
            Building trusted partnerships across the health and wellness ecosystem to deliver pure, quality products to you.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative mb-12">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {collaborations.map((collab) => (
                <div key={collab.id} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0">
                  <Card className="h-full border-border bg-card hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-primary font-bold text-2xl">
                            {collab.name.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <h3 className="text-xl font-serif font-bold text-primary mb-2">
                        {collab.name}
                      </h3>
                      <p className="text-foreground/80 mb-4 text-sm">
                        {collab.description}
                      </p>
                      {collab.link && (
                        <a 
                          href={collab.link} 
                          className="inline-flex items-center text-secondary hover:text-primary transition-colors text-sm font-medium"
                        >
                          Learn More <ExternalLink className="ml-1 w-4 h-4" />
                        </a>
                      )}
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-background border-primary hover:bg-primary hover:text-primary-foreground"
            onClick={scrollPrev}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-background border-primary hover:bg-primary hover:text-primary-foreground"
            onClick={scrollNext}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Partnership CTA */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-serif font-bold text-primary mb-4 drop-shadow-sm">
            Interested in Partnering with Us?
          </h2>
          <p className="text-foreground/80 max-w-2xl mx-auto mb-6">
            We're always looking to collaborate with like-minded organizations committed to health, wellness, and sustainability.
          </p>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Get in Touch
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Collaborations;
