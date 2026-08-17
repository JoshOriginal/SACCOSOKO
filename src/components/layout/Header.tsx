import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  ShoppingCart, 
  User, 
  Menu, 
  X,
  Package,
  MapPin,
  ShoppingBag,
  ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/categories", label: "Categories" },
    { href: "/track-order", label: "Track Order", icon: MapPin },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
      {/* Top bar */}
      <div className="bg-secondary text-secondary-foreground">
        <div className="container flex h-9 sm:h-10 items-center justify-between px-3 sm:px-4 text-xs sm:text-sm gap-2">
          <div className="flex items-center gap-1 sm:gap-2 min-w-0 flex-shrink">
            <Package className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
            <span className="truncate">Delivering across Kenya via SACCO-SOKO routes</span>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <Link to="/seller/register" className="hover:text-primary transition-colors whitespace-nowrap">
              Become a Seller
            </Link>
            <Link to="/help" className="hover:text-primary transition-colors whitespace-nowrap">
              Help Center
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container px-3 sm:px-4">
        <div className="flex h-14 sm:h-16 items-center gap-2 sm:gap-4 lg:gap-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0 active:scale-95 transition-transform">
            <div className="flex items-center">
              <img
                src="/favicon-32x32.png"
                alt="SACCO-SOKO"
                className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg object-cover"
              />
              <div className="ml-2 hidden sm:block">
                <span className="font-display font-bold text-base sm:text-lg text-foreground">SACCO</span>
                <span className="font-display font-bold text-base sm:text-lg text-primary">-SOKO</span>
              </div>
            </div>
          </Link>

          {/* Search bar - hidden on mobile, shown on md+ */}
          <div className="flex-1 max-w-2xl hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products, categories, sellers..."
                className="pl-10 pr-4 h-11 bg-muted/50 border-0 focus-visible:ring-2 focus-visible:ring-primary text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap",
                  isActive(link.href)
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:text-primary hover:bg-muted"
                )}
              >
                <span className="flex items-center gap-2">
                  {link.icon && <link.icon className="h-4 w-4" />}
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Link to="/cart" className="active:scale-95 transition-transform">
              <Button variant="ghost" size="icon" className="relative h-9 w-9 sm:h-10 sm:w-10">
                <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                  0
                </span>
              </Button>
            </Link>
            
            <Link to="/auth" className="hidden xs:block active:scale-95 transition-transform">
              <Button variant="secondary" size="sm" className="gap-2 h-9 sm:h-10 text-xs sm:text-sm px-2 sm:px-4">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Login</span>
              </Button>
            </Link>

            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden h-9 w-9 sm:h-10 sm:w-10 active:scale-95 transition-transform"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="pb-2 sm:pb-3 md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-10 pr-4 h-9 sm:h-10 bg-muted/50 border-0 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background animate-slide-up">
          <nav className="container px-3 sm:px-4 py-3 sm:py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors active:scale-95",
                  isActive(link.href)
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {link.icon && <link.icon className="h-5 w-5" />}
                {link.label}
              </Link>
            ))}
            <div className="pt-2 sm:pt-3 border-t border-border mt-2 sm:mt-3">
              <Link
                to="/auth"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted active:scale-95 transition-colors"
              >
                <User className="h-5 w-5" />
                Login / Register
              </Link>
              <Link
                to="/seller/register"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted active:scale-95 transition-colors"
              >
                <ShoppingBag className="h-5 w-5" />
                Become a Seller
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
