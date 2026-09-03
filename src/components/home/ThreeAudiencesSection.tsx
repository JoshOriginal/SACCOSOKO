import { Link } from "react-router-dom";
import { ShoppingBag, Store, Truck, ArrowRight } from "lucide-react";

const audiences = [
  {
    icon: ShoppingBag,
    title: "Customers",
    description: "Shop online from verified sellers and receive your order, or collect it at your nearest stage.",
    cta: "Start Shopping",
    to: "/shop",
    accent: "bg-brand-light-green text-primary",
  },
  {
    icon: Store,
    title: "Sellers",
    description: "Reach more customers online and manage your orders through a network that's already running.",
    cta: "Become a Seller",
    to: "/sell",
    accent: "bg-brand-light-green text-primary",
  },
  {
    icon: Truck,
    title: "SACCOs & Transport Networks",
    description: "Turn your existing routes and stages into a digital commerce and delivery network.",
    cta: "Explore SACCO-SOKO",
    to: "#sacco-partner",
    accent: "bg-brand-light-blue text-secondary",
  },
];

const ThreeAudiencesSection = () => {
  return (
    <section className="py-12 lg:py-16 bg-background">
      <div className="container px-3 sm:px-4">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">One Platform, Three Sides</h2>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto text-sm sm:text-base">
            SACCO-SOKO connects everyone who makes delivery through an existing transport network possible.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
          {audiences.map((audience) => (
            <div
              key={audience.title}
              className="bg-card rounded-2xl border border-border p-5 sm:p-6 hover:shadow-lg hover:border-primary/30 transition-all duration-300"
            >
              <div className={`h-11 w-11 rounded-xl flex items-center justify-center mb-4 ${audience.accent}`}>
                <audience.icon className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-foreground">{audience.title}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{audience.description}</p>
              <Link
                to={audience.to}
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors mt-4"
              >
                {audience.cta}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThreeAudiencesSection;
