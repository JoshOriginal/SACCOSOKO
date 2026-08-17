import { Button } from "@/components/ui/button";
import { ArrowRight, Truck, Shield, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero-blue">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container relative px-3 sm:px-4">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 py-8 sm:py-12 lg:py-20">
          {/* Content */}
          <div className="flex flex-col justify-center text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-primary/20 text-primary-foreground text-xs sm:text-sm font-medium mb-4 sm:mb-6 mx-auto lg:mx-0 w-fit animate-fade-in">
              <Truck className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              Powered by SACCO-SOKO Transport
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight animate-slide-up">
              Shop from{" "}
              <span className="text-primary">Anywhere</span>,{" "}
              <br className="hidden sm:block" />
              Deliver to Your{" "}
              <span className="text-primary">Stage</span>
            </h1>
            
            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-white/90 max-w-xl mx-auto lg:mx-0 animate-slide-up leading-relaxed" style={{ animationDelay: "0.1s" }}>
              Kenya's first e-commerce platform using SACCO-SOKO's reliable bus routes. Shop from verified sellers across the country and pick up at your nearest stage.
            </p>

            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 justify-center lg:justify-start animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Link to="/shop" className="w-full xs:w-auto">
                <Button variant="hero" size="lg" className="w-full xs:w-auto h-10 sm:h-11 text-sm sm:text-base">
                  Start Shopping
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </Link>
              <Link to="/seller/register" className="w-full xs:w-auto">
                <Button variant="hero-outline" size="lg" className="w-full xs:w-auto h-10 sm:h-11 text-sm sm:text-base">
                  Become a Seller
                </Button>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-col xs:flex-row xs:flex-wrap items-center gap-4 sm:gap-6 mt-8 sm:mt-10 justify-center lg:justify-start animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <div className="flex items-center gap-2 text-white/90">
                <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-white flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium">Buyer Protection</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-white flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium">50+ Routes</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Truck className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium">Same-Day Delivery</span>
              </div>
            </div>
          </div>

          {/* Hero image/illustration */}
          <div className="relative flex items-center justify-center animate-fade-in hidden lg:flex" style={{ animationDelay: "0.2s" }}>
            <div className="relative w-full max-w-lg">
              {/* Floating cards - hidden on mobile/tablet */}
              <div className="hidden xl:block absolute -top-4 -left-4 bg-card rounded-2xl shadow-xl p-4 animate-float z-10">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-brand-light-green flex items-center justify-center">
                    <Truck className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Order Status</p>
                    <p className="font-semibold text-sm text-foreground">In Transit to Kikuyu</p>
                  </div>
                </div>
              </div>

              <div className="hidden xl:block absolute -bottom-4 -right-4 bg-card rounded-2xl shadow-xl p-4 animate-float z-10" style={{ animationDelay: "1s" }}>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-brand-light-blue flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Pickup Ready</p>
                    <p className="font-semibold text-sm text-foreground">Thika Stage</p>
                  </div>
                </div>
              </div>

              {/* Main illustration area */}
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center backdrop-blur-sm border border-secondary-foreground/10">
                <div className="text-center p-8">
                  <div className="h-20 sm:h-24 w-20 sm:w-24 mx-auto rounded-2xl bg-gradient-hero flex items-center justify-center mb-3 sm:mb-4 shadow-glow-green">
                    <span className="text-primary-foreground font-bold text-2xl sm:text-4xl">SS</span>
                  </div>
                  <p className="text-secondary-foreground font-semibold text-base sm:text-lg">SACCO-SOKO</p>
                  <p className="text-secondary-foreground/70 text-xs sm:text-sm">Marketplace</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
