import { Button } from "@/components/ui/button";
import { ArrowRight, Store, TrendingUp, Users, Truck } from "lucide-react";
import { Link } from "react-router-dom";

const benefits = [
  { icon: Users, title: "Reach Millions", desc: "Access customers across Kenya" },
  { icon: Truck, title: "Easy Logistics", desc: "SACCO-SOKO handles delivery" },
  { icon: TrendingUp, title: "Grow Revenue", desc: "Low fees, high margins" },
];

const SellerCTA = () => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-hero relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary-foreground blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-primary-foreground blur-3xl" />
      </div>

      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/20 text-primary-foreground text-sm font-medium mb-6">
              <Store className="h-4 w-4" />
              Join Our Seller Community
            </div>
            
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-primary-foreground leading-tight">
              Start Selling on{" "}
              <span className="text-white">SACCO-SOKO</span>{" "}
              Today
            </h2>
            
            <p className="mt-4 text-lg text-primary-foreground/80 max-w-xl">
              Join thousands of sellers already growing their business with Kenya's most trusted delivery network. 
              No upfront costs, easy setup.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start">
              <Link to="/seller/register">
                <Button 
                  variant="hero-secondary" 
                  size="xl" 
                  className="w-full sm:w-auto bg-secondary text-secondary-foreground hover:bg-secondary/90"
                >
                  Register as Seller
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/seller/info">
                <Button 
                  variant="hero-outline" 
                  size="xl" 
                  className="w-full sm:w-auto"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="flex items-center gap-4 bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-5 border border-primary-foreground/20 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="h-14 w-14 rounded-xl bg-primary-foreground/20 flex items-center justify-center shrink-0">
                  <benefit.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-primary-foreground">{benefit.title}</h3>
                  <p className="text-primary-foreground/70">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SellerCTA;
