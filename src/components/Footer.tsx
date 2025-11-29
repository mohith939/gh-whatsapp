import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Youtube, Phone, MapPin, Star, Quote, Award, Shield, CheckCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import companyLogo from '@/assets/company_logo.png';

const Footer = () => {
  return (
    <footer className="bg-warm-beige border-t border-border">
      {/* Newsletter Section */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-serif font-bold text-primary mb-4">
              Stay Connected with Farm Fresh Updates
            </h3>
            <p className="text-foreground/70 mb-6">
              Get the latest on new products, farming stories, and exclusive offers delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
              />
              <Button className="bg-primary hover:bg-primary/90">
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-foreground/60 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* About Section */}
          <div className="md:col-span-2">
            <img src={companyLogo} alt="Golden Harvest" className="h-16 w-auto mb-4" />
            <p className="text-sm text-foreground/70 mb-6">
              Raw. Real. Truly Pure. Clean, raw, chemical-free powders made from fresh farm produce.
              Connecting India's farmers directly to your kitchen.
            </p>
            <div className="flex flex-wrap gap-4 mb-6">
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="mailto:info@goldenharvest.com" className="text-foreground/60 hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </a>
              <a href="tel:+919949589098" className="text-foreground/60 hover:text-primary transition-colors">
                <Phone className="h-5 w-5" />
              </a>
            </div>
            <div className="flex items-center text-sm text-foreground/70">
              <MapPin className="h-4 w-4 mr-2" />
              Serving across India with love
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-primary mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/shop" className="text-sm text-foreground/70 hover:text-primary transition-colors">Shop All Products</Link></li>
              <li><Link to="/about" className="text-sm text-foreground/70 hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/testimonials" className="text-sm text-foreground/70 hover:text-primary transition-colors">Testimonials</Link></li>
              <li><Link to="/collaborations" className="text-sm text-foreground/70 hover:text-primary transition-colors">Partners</Link></li>
              <li><Link to="/faq" className="text-sm text-foreground/70 hover:text-primary transition-colors">FAQs</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-sm font-semibold text-primary mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><Link to="/shipping" className="text-sm text-foreground/70 hover:text-primary transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/contact" className="text-sm text-foreground/70 hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link to="/bulk-inquiry" className="text-sm text-foreground/70 hover:text-primary transition-colors">Bulk Orders</Link></li>
              <li><Link to="/order-tracking" className="text-sm text-foreground/70 hover:text-primary transition-colors">Track Order</Link></li>
            </ul>
          </div>

          {/* Legal & Certifications */}
          <div>
            <h4 className="text-sm font-semibold text-primary mb-4">Legal & Certifications</h4>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-sm text-foreground/70 hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm text-foreground/70 hover:text-primary transition-colors">Terms of Service</Link></li>
              <li className="text-sm text-foreground/70">FSSAI: 12345678901234</li>
              <li className="text-sm text-foreground/70">GST: 22AAAAA0000A1Z5</li>
            </ul>
            <div className="mt-6">
              <h5 className="text-sm font-semibold text-primary mb-3 flex items-center">
                <Award className="w-4 h-4 mr-2" />
                Trust Badges
              </h5>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2 p-2 bg-primary/5 rounded-lg">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span className="text-xs font-medium text-primary">Lab Tested</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-primary/5 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-xs font-medium text-primary">FSSAI Certified</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-primary/5 rounded-lg">
                  <Award className="w-4 h-4 text-green-600" />
                  <span className="text-xs font-medium text-primary">Organic</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-primary/5 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-xs font-medium text-primary">Non-GMO</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-center md:text-left text-sm text-foreground/60">
              © {new Date().getFullYear()} Golden Harvest Raw Powders. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-sm text-foreground/60">Made with ❤️ in India</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
