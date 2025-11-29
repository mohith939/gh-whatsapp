import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin, Clock, CheckCircle, Star, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { trackFormSubmission } from '@/utils/analytics';
import {
  sanitizeName,
  sanitizeEmail,
  sanitizePhone,
  sanitizeMessage,
  validateContactForm,
  rateLimiter
} from '@/utils/security';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // Sanitize input based on field type
    let sanitizedValue = value;
    switch (name) {
      case 'name':
        sanitizedValue = sanitizeName(value);
        break;
      case 'email':
        sanitizedValue = sanitizeEmail(value);
        break;
      case 'phone':
        sanitizedValue = sanitizePhone(value);
        break;
      case 'message':
        sanitizedValue = sanitizeMessage(value);
        break;
      default:
        sanitizedValue = value.replace(/<[^>]*>/g, '').trim();
    }

    setFormData(prev => ({ ...prev, [name]: sanitizedValue }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Rate limiting check
    if (!rateLimiter.isAllowed('contact_form', 3, 60000)) { // 3 attempts per minute
      toast({
        title: "Too many attempts",
        description: "Please wait a minute before submitting again.",
        variant: "destructive",
      });
      return;
    }

    // Validate form data
    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      toast({
        title: "Validation Error",
        description: validation.errors.join(' '),
        variant: "destructive",
      });
      return;
    }

    // Track form submission
    trackFormSubmission('contact_form', true);

    // TODO: Implement actual form submission to backend
    console.log('Form submitted:', formData);

    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
    });

    // Reset form
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    rateLimiter.reset('contact_form');
  };

  return (
    <div className="w-full py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-12 text-center animate-fade-in">Contact Us</h1>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-primary">Get In Touch</CardTitle>
                <p className="text-foreground/70">Have questions about our products or need assistance? We're here to help!</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium text-foreground">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium text-foreground">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium text-foreground">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 XXXXX XXXXX"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="subject" className="text-sm font-medium text-foreground">Subject *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="How can we help?"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-sm font-medium text-foreground">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us more about your inquiry..."
                      rows={5}
                      className="mt-1"
                    />
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information & Trust Elements */}
            <div className="space-y-8">
              {/* Contact Details */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-2xl font-serif text-primary">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-primary mb-1">Email</h3>
                      <p className="text-foreground/70">info@goldenharvest.com</p>
                      <p className="text-sm text-foreground/60">We respond within 2-4 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-primary mb-1">Phone</h3>
                      <p className="text-foreground/70">+91 9876543210</p>
                      <p className="text-sm text-foreground/60">Mon-Fri, 9 AM - 6 PM IST</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-primary mb-1">Address</h3>
                      <p className="text-foreground/70">Golden Harvest Farms<br />Rural India</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-primary mb-1">Business Hours</h3>
                      <p className="text-foreground/70">Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p className="text-foreground/70">Saturday: 9:00 AM - 2:00 PM</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Trust Elements */}
              <Card className="border-border bg-gradient-to-br from-primary/5 to-primary/10">
                <CardHeader>
                  <CardTitle className="text-2xl font-serif text-primary">Why Choose Golden Harvest?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-foreground/80">Direct from farmers, no middlemen</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-foreground/80">Lab-tested for purity and safety</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-foreground/80">FSSAI certified and compliant</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-foreground/80">Cash on Delivery available</span>
                  </div>
                </CardContent>
              </Card>

              {/* Customer Testimonials */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-2xl font-serif text-primary flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    What Our Customers Say
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-4 border-primary pl-4">
                      <p className="text-foreground/80 italic">"Excellent customer service and pure products. Highly recommend!"</p>
                      <p className="text-sm text-foreground/60 mt-2">- Priya S., Mumbai</p>
                    </div>
                    <div className="border-l-4 border-primary pl-4">
                      <p className="text-foreground/80 italic">"Fast delivery and authentic quality. Will order again."</p>
                      <p className="text-sm text-foreground/60 mt-2">- Rajesh K., Delhi</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
