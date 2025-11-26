import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-warm-beige border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-serif font-bold text-primary mb-4">Golden Harvest</h3>
            <p className="text-sm text-foreground/70 mb-4">
              Raw. Real. Truly Pure. Clean, raw, chemical-free powders made from fresh farm produce.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="mailto:info@goldenharvest.com" className="text-foreground/60 hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </a>
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
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-sm font-semibold text-primary mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><Link to="/shipping" className="text-sm text-foreground/70 hover:text-primary transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/faq" className="text-sm text-foreground/70 hover:text-primary transition-colors">FAQs</Link></li>
              <li><Link to="/contact" className="text-sm text-foreground/70 hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link to="/bulk-inquiry" className="text-sm text-foreground/70 hover:text-primary transition-colors">Bulk Orders</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-primary mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-sm text-foreground/70 hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li className="text-sm text-foreground/70">FSSAI: 12345678901234</li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                Lab Tested
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                FSSAI Certified
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-center text-sm text-foreground/60">
            © {new Date().getFullYear()} Golden Harvest Raw Powders. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
