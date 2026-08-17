import { Link } from "react-router-dom";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin,
  CreditCard,
  Truck,
  Shield,
  Clock
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const features = [
    { icon: Truck, title: "SACCO-SOKO Delivery", desc: "Reliable town-to-town delivery" },
    { icon: CreditCard, title: "Secure Payments", desc: "M-Pesa & Card accepted" },
    { icon: Shield, title: "Buyer Protection", desc: "Safe & secure shopping" },
    { icon: Clock, title: "Track Orders", desc: "Real-time tracking" },
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* Features bar */}
      <div className="border-b border-secondary-foreground/10">
        <div className="container py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-start gap-3">
                <div className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center shrink-0">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{feature.title}</h4>
                  <p className="text-secondary-foreground/70 text-xs mt-0.5">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/favicon-32x32.png"
                alt="SACCO-SOKO"
                className="h-10 w-10 rounded-lg object-cover"
              />
              <div>
                <span className="font-display font-bold text-lg">SACCO</span>
                <span className="font-display font-bold text-lg text-primary">-SOKO</span>
              </div>
            </div>
            <p className="text-secondary-foreground/70 text-sm leading-relaxed mb-4">
              Kenya's trusted marketplace powered by SACCO-SOKO's reliable transport network. 
              Shop from verified sellers and enjoy seamless delivery to your nearest stage.
            </p>
            <div className="flex gap-3">
              <a href="#" className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center hover:bg-primary/80 transition-colors text-white">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center hover:bg-primary/80 transition-colors text-white">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center hover:bg-primary/80 transition-colors text-white">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/shop" className="text-secondary-foreground/70 hover:text-primary transition-colors">Shop All</Link></li>
              <li><Link to="/categories" className="text-secondary-foreground/70 hover:text-primary transition-colors">Categories</Link></li>
              <li><Link to="/track-order" className="text-secondary-foreground/70 hover:text-primary transition-colors">Track Order</Link></li>
              <li><Link to="/sell" className="text-secondary-foreground/70 hover:text-primary transition-colors">Sell on SACCO-SOKO</Link></li>
              <li><Link to="/about-us" className="text-secondary-foreground/70 hover:text-primary transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Customer service */}
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/help" className="text-secondary-foreground/70 hover:text-primary transition-colors">Help Center</Link></li>
              <li><Link to="/returns-refunds" className="text-secondary-foreground/70 hover:text-primary transition-colors">Returns & Refunds</Link></li>
              <li><Link to="/shipping-info" className="text-secondary-foreground/70 hover:text-primary transition-colors">Shipping Info</Link></li>
              <li><Link to="/faqs" className="text-secondary-foreground/70 hover:text-primary transition-colors">FAQs</Link></li>
              <li><Link to="/contact-us" className="text-secondary-foreground/70 hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 text-white shrink-0" />
                <span className="text-secondary-foreground/70">Nairobi CBD, Kenya</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-white shrink-0" />
                <span className="text-secondary-foreground/70">+254 700 000 000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-white shrink-0" />
                <span className="text-secondary-foreground/70">support@sacco-soko.co.ke</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-secondary-foreground/10">
        <div className="container py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-secondary-foreground/60">
            <p>© {currentYear} SACCO-SOKO Kenya. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
