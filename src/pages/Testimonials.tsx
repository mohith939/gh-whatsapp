import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    rating: 5,
    text: 'The banana powder is amazing! My kids love it in their smoothies. Pure quality and no additives.',
    image: null,
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    rating: 5,
    text: 'Best turmeric powder I have used. The color and aroma are authentic. Highly recommend!',
    image: null,
  },
  {
    id: 3,
    name: 'Anita Patel',
    rating: 5,
    text: 'Moringa powder has boosted my energy levels. Great product and fast delivery.',
    image: null,
  },
  {
    id: 4,
    name: 'Vikram Singh',
    rating: 5,
    text: 'Ashwagandha powder helped me with stress management. Pure and effective.',
    image: null,
  },
  {
    id: 5,
    name: 'Lakshmi Iyer',
    rating: 5,
    text: 'Amla powder is excellent for my hair. Natural and chemical-free as promised.',
    image: null,
  },
  {
    id: 6,
    name: 'Arjun Reddy',
    rating: 5,
    text: 'Beetroot powder is perfect for my pre-workout drinks. Great quality!',
    image: null,
  },
];

const Testimonials = () => {
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
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4 drop-shadow-sm">
            Customer Testimonials
          </h1>
          <p className="text-foreground text-lg max-w-2xl mx-auto">
            Hear what our customers have to say about Golden Harvest Raw Powders. Real experiences from real people.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0">
                  <Card className="h-full border-muted bg-muted/50 hover:shadow-md hover:scale-105 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-1 mb-3">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                        ))}
                      </div>
                      <p className="text-foreground/80 mb-4 italic">"{testimonial.text}"</p>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-primary font-bold text-lg">
                            {testimonial.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{testimonial.name}</p>
                          <p className="text-sm text-foreground/60">Verified Customer</p>
                        </div>
                      </div>
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

        {/* Trust Message */}
        <div className="mt-12 bg-muted/50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-serif font-bold text-primary mb-4 drop-shadow-sm">
            Join Thousands of Satisfied Customers
          </h2>
          <p className="text-foreground/80 max-w-2xl mx-auto">
            Experience the Golden Harvest difference — pure, lab-tested, and trusted by families across India.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
