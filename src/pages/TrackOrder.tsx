import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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
  PackageCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Order, OrderStatus } from "@/types";
import { findOrder } from "@/data/orders";

const STATUS_ICONS: Record<OrderStatus, typeof Package> = {
  pending: Package,
  processing: Clock,
  "picked-up": Truck,
  "in-transit": Truck,
  "at-stage": MapPin,
  delivered: CheckCircle2,
  cancelled: Package,
};

const TrackOrder = () => {
  const location = useLocation();
  const [trackingInput, setTrackingInput] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [searched, setSearched] = useState(false);

  // If we arrived here right after checkout, the freshly-placed order is
  // passed via router state so it can be shown immediately.
  useEffect(() => {
    const stateOrder = (location.state as { order?: Order } | null)?.order;
    if (stateOrder) {
      setOrder(stateOrder);
      setTrackingInput(stateOrder.id);
      setSearched(true);
    }
  }, [location.state]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    const found = findOrder(trackingInput);
    setOrder(found ?? null);
    setSearched(true);
  };

  const currentStep = order?.timeline.filter((step) => step.completed).slice(-1)[0];

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
                Enter your Order ID to see the current status of your delivery
              </p>
            </div>

            {/* Search Form */}
            <form onSubmit={handleTrack} className="mb-8">
              <div className="flex gap-3 bg-card rounded-xl border border-border p-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Enter Order ID (e.g., SKO-2026-018823)"
                    className="pl-10 h-12 border-0 bg-transparent"
                    value={trackingInput}
                    onChange={(e) => setTrackingInput(e.target.value)}
                  />
                </div>
                <Button type="submit" variant="hero" size="lg" className="shrink-0">
                  Track Order
                </Button>
              </div>
            </form>

            {/* Results */}
            {order && (
              <div className="bg-card rounded-2xl border border-border p-6 lg:p-8 animate-fade-in">
                {/* Order Info */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border">
                  <div>
                    <p className="text-sm text-muted-foreground">Order ID</p>
                    <p className="text-xl font-bold text-foreground">{order.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Order Total</p>
                    <p className="text-lg font-semibold text-primary">{formatPrice(order.total)}</p>
                  </div>
                </div>

                {/* Current Status */}
                {currentStep && (
                  <div className="py-6 border-b border-border">
                    <div className="flex items-center gap-4 bg-brand-light-green rounded-xl p-4">
                      <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center animate-pulse">
                        {(() => {
                          const Icon = STATUS_ICONS[currentStep.status];
                          return <Icon className="h-6 w-6 text-primary-foreground" />;
                        })()}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{currentStep.label}</p>
                        <p className="text-sm text-muted-foreground">{currentStep.description}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Timeline */}
                <div className="pt-6">
                  <h3 className="font-semibold text-foreground mb-6">Delivery Progress</h3>
                  <div className="space-y-0">
                    {order.timeline.map((step, index) => {
                      const Icon = STATUS_ICONS[step.status];
                      const isActive = step.status === currentStep?.status;
                      return (
                        <div key={step.status} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${
                              step.completed && !isActive
                                ? "bg-primary text-primary-foreground"
                                : isActive
                                ? "bg-primary text-primary-foreground animate-pulse"
                                : "bg-muted text-muted-foreground"
                            }`}>
                              <Icon className="h-5 w-5" />
                            </div>
                            {index < order.timeline.length - 1 && (
                              <div className={`w-0.5 h-16 ${
                                step.completed ? "bg-primary" : "bg-border"
                              }`} />
                            )}
                          </div>
                          <div className="pb-8">
                            <h4 className={`font-medium ${
                              !step.completed ? "text-muted-foreground" : "text-foreground"
                            }`}>
                              {step.label}
                            </h4>
                            <p className="text-sm text-muted-foreground">{step.description}</p>
                            {step.timestamp && (
                              <p className="text-xs text-muted-foreground mt-1">{step.timestamp}</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Items */}
                <div className="pt-2 pb-6 border-b border-border">
                  <h3 className="font-semibold text-foreground mb-4">Items in this Order</h3>
                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div key={item.productId} className="flex items-center gap-3">
                        <img src={item.image} alt={item.name} className="h-12 w-12 rounded-lg object-cover bg-muted shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.seller} · Qty {item.quantity}</p>
                        </div>
                        <span className="text-sm font-semibold text-foreground">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Route Info */}
                {(order.routeLabel || order.stageLabel) && (
                  <div className="mt-6 pt-6 flex items-center gap-3 text-sm flex-wrap">
                    <MapPin className="h-5 w-5 text-secondary shrink-0" />
                    {order.routeLabel && (
                      <>
                        <span className="text-muted-foreground">Route:</span>
                        <span className="font-medium text-foreground">{order.routeLabel}</span>
                      </>
                    )}
                    {order.stageLabel && (
                      <span className="text-muted-foreground">→ Pickup at {order.stageLabel}</span>
                    )}
                  </div>
                )}
              </div>
            )}

            {searched && !order && (
              <div className="bg-card rounded-2xl border border-border p-8 text-center animate-fade-in">
                <div className="h-16 w-16 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
                  <Package className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Order Not Found</h3>
                <p className="text-muted-foreground mb-6">
                  We couldn't find an order with this ID. Please check and try again.
                </p>
                <p className="text-sm text-muted-foreground">
                  You can find your Order ID on your checkout confirmation screen.
                </p>
              </div>
            )}

            {!searched && (
              <div className="bg-card rounded-2xl border border-border p-8 text-center">
                <div className="h-16 w-16 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
                  <PackageCheck className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">Enter an Order ID above to see its delivery status.</p>
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
