import { MapPin, ArrowRight, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const routes = [
  { from: "Nairobi CBD", to: "Kikuyu", time: "45 mins", price: "KES 150" },
  { from: "Nairobi CBD", to: "Thika", time: "1 hour", price: "KES 200" },
  { from: "Nairobi CBD", to: "Kitengela", time: "50 mins", price: "KES 180" },
  { from: "Nairobi CBD", to: "Rongai", time: "40 mins", price: "KES 120" },
  { from: "Nairobi CBD", to: "Limuru", time: "55 mins", price: "KES 170" },
  { from: "Nairobi CBD", to: "Juja", time: "35 mins", price: "KES 100" },
];

const DeliveryRoutes = () => {
  return (
    <section className="py-12 lg:py-16 bg-background">
      <div className="container">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-light-blue text-secondary text-sm font-medium mb-4">
            <Truck className="h-4 w-4" />
            SACCO-SOKO Delivery Network
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
            Delivery to Your Nearest Stage
          </h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            We deliver via SACCO-SOKO's established bus routes. Pick up your order from any of our stages or opt for door-to-door delivery.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {routes.map((route, index) => (
            <div
              key={index}
              className="group bg-card rounded-xl border border-border p-5 hover:border-primary/30 hover:shadow-lg transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg bg-brand-light-blue flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-secondary" />
                </div>
                <div className="flex-1 flex items-center gap-2">
                  <span className="font-medium text-foreground">{route.from}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium text-primary">{route.to}</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Est. {route.time}</span>
                <span className="font-semibold text-foreground">{route.price}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/routes">
            <Button variant="secondary" size="lg" className="gap-2">
              View All Routes
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DeliveryRoutes;
