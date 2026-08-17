import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Package, 
  Truck, 
  MapPin, 
  CheckCircle2,
  Clock,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

const TrackOrder = () => {
  const [trackingId, setTrackingId] = useState("");
  const [orderStatus, setOrderStatus] = useState<null | "found" | "not-found">(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate tracking lookup
    if (trackingId.toUpperCase().startsWith("SM")) {
      setOrderStatus("found");
    } else {
      setOrderStatus("not-found");
    }
  };

  const trackingSteps = [
    { 
      status: "completed", 
      title: "Order Placed", 
      desc: "Your order has been confirmed", 
      date: "Dec 8, 2024 - 10:30 AM",
      icon: Package
    },
    { 
      status: "completed", 
      title: "Seller Preparing", 
      desc: "Seller is preparing your order", 
      date: "Dec 8, 2024 - 2:15 PM",
      icon: Clock
    },
    { 
      status: "completed", 
      title: "Picked by SACCO-SOKO", 
      desc: "Package collected from seller", 
      date: "Dec 9, 2024 - 9:00 AM",
      icon: Truck
    },
    { 
      status: "active", 
      title: "In Transit", 
      desc: "On the way to Kikuyu Stage", 
      date: "Dec 9, 2024 - 11:30 AM",
      icon: Truck
    },
    { 
      status: "pending", 
      title: "At Destination Stage", 
      desc: "Ready for pickup at Kikuyu Stage", 
      date: "",
      icon: MapPin
    },
    { 
      status: "pending", 
      title: "Delivered", 
      desc: "Package delivered successfully", 
      date: "",
      icon: CheckCircle2
    },
  ];

  return (
    <Layout>
      <div className="bg-muted/30 min-h-screen">
        <div className="container py-8 lg:py-12">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-light-blue text-secondary text-sm font-medium mb-4">
                <MapPin className="h-4 w-4" />
                SACCO-SOKO Tracking
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground">Track Your Order</h1>
              <p className="text-muted-foreground mt-2">
                Enter your tracking ID to see the current status of your delivery
              </p>
            </div>

            {/* Search Form */}
            <form onSubmit={handleTrack} className="mb-8">
              <div className="flex gap-3 bg-card rounded-xl border border-border p-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Enter tracking ID (e.g., SM123456789)"
                    className="pl-10 h-12 border-0 bg-transparent"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                  />
                </div>
                <Button type="submit" variant="hero" size="lg" className="shrink-0">
                  Track Order
                </Button>
              </div>
            </form>

            {/* Results */}
            {orderStatus === "found" && (
              <div className="bg-card rounded-2xl border border-border p-6 lg:p-8 animate-fade-in">
                {/* Order Info */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border">
                  <div>
                    <p className="text-sm text-muted-foreground">Tracking ID</p>
                    <p className="text-xl font-bold text-foreground">{trackingId.toUpperCase()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Estimated Arrival</p>
                    <p className="text-lg font-semibold text-primary">Dec 9, 2024 - 3:00 PM</p>
                  </div>
                </div>

                {/* Current Status */}
                <div className="py-6 border-b border-border">
                  <div className="flex items-center gap-4 bg-brand-light-green rounded-xl p-4">
                    <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center animate-pulse">
                      <Truck className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">In Transit to Kikuyu Stage</p>
                      <p className="text-sm text-muted-foreground">Your package is on the way!</p>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="pt-6">
                  <h3 className="font-semibold text-foreground mb-6">Delivery Progress</h3>
                  <div className="space-y-0">
                    {trackingSteps.map((step, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${
                            step.status === "completed" 
                              ? "bg-primary text-primary-foreground" 
                              : step.status === "active"
                              ? "bg-primary text-primary-foreground animate-pulse"
                              : "bg-muted text-muted-foreground"
                          }`}>
                            <step.icon className="h-5 w-5" />
                          </div>
                          {index < trackingSteps.length - 1 && (
                            <div className={`w-0.5 h-16 ${
                              step.status === "completed" ? "bg-primary" : "bg-border"
                            }`} />
                          )}
                        </div>
                        <div className="pb-8">
                          <h4 className={`font-medium ${
                            step.status === "pending" ? "text-muted-foreground" : "text-foreground"
                          }`}>
                            {step.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">{step.desc}</p>
                          {step.date && (
                            <p className="text-xs text-muted-foreground mt-1">{step.date}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Route Info */}
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="h-5 w-5 text-secondary" />
                    <span className="text-muted-foreground">Route:</span>
                    <span className="font-medium text-foreground">Nairobi CBD → Kikuyu Stage</span>
                  </div>
                </div>
              </div>
            )}

            {orderStatus === "not-found" && (
              <div className="bg-card rounded-2xl border border-border p-8 text-center animate-fade-in">
                <div className="h-16 w-16 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
                  <Package className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Order Not Found</h3>
                <p className="text-muted-foreground mb-6">
                  We couldn't find an order with this tracking ID. Please check and try again.
                </p>
                <p className="text-sm text-muted-foreground">
                  Tracking IDs start with "SM" followed by numbers (e.g., SM123456789)
                </p>
              </div>
            )}

            {/* Help Section */}
            <div className="mt-8 text-center">
              <p className="text-muted-foreground text-sm">
                Need help with your order?{" "}
                <Link to="/help" className="text-primary font-medium hover:underline">
                  Contact Support
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TrackOrder;
