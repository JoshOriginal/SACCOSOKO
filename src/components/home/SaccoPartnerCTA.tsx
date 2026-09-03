import { Button } from "@/components/ui/button";
import { ArrowRight, Truck, Route as RouteIcon, MapPin } from "lucide-react";

const SaccoPartnerCTA = () => {
  return (
    <section id="sacco-partner" className="py-16 lg:py-24 bg-gradient-hero-blue relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-primary-foreground blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-primary-foreground blur-3xl" />
      </div>

      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/20 text-primary-foreground text-sm font-medium mb-6">
              <Truck className="h-4 w-4" />
              For SACCOs & Transport Companies
            </div>

            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-primary-foreground leading-tight">
              Own a Transport Network?
            </h2>

            <p className="mt-4 text-lg text-primary-foreground/80 max-w-xl">
              Turn your routes and stages into a digital commerce and delivery network — reaching new customers
              without adding new vehicles.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start">
              <a href="https://www.tazikisolutions.com" target="_blank" rel="noopener noreferrer">
                <Button variant="hero-secondary" size="xl" className="w-full sm:w-auto gap-2">
                  Partner With Us
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </a>
            </div>
            <p className="text-xs text-primary-foreground/60 mt-3">
              Built by Taziki Solutions — learn more at tazikisolutions.com
            </p>
          </div>

          <div className="grid gap-4">
            {[
              { icon: RouteIcon, title: "Use Your Existing Routes", desc: "No new fleet or infrastructure required" },
              { icon: MapPin, title: "Turn Stages into Pickup Points", desc: "Stops your vehicles already make" },
              { icon: Truck, title: "New Digital Reach", desc: "Connect local sellers to online customers" },
            ].map((item, index) => (
              <div
                key={item.title}
                className="flex items-center gap-4 bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-5 border border-primary-foreground/20 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="h-14 w-14 rounded-xl bg-primary-foreground/20 flex items-center justify-center shrink-0">
                  <item.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-primary-foreground">{item.title}</h3>
                  <p className="text-primary-foreground/70">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SaccoPartnerCTA;
