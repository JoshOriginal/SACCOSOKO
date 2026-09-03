import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useOrders } from "@/hooks/useOrders";
import { getDemoSacco } from "@/data/demoSacco";
import { getRoutesBySacco } from "@/data/routes";
import { getStagesByRoute } from "@/data/stages";
import { getSaccoOrders } from "@/lib/saccoOrders";
import { MapPin, Clock, Wallet, Package, RouteOff } from "lucide-react";
import { cn } from "@/lib/utils";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-KE", { style: "currency", currency: "KES", minimumFractionDigits: 0 }).format(price);

const activityStatus = (count: number) => {
  if (count === 0) return { label: "Low Activity", className: "bg-muted text-muted-foreground" };
  if (count <= 2) return { label: "Active", className: "bg-primary text-primary-foreground" };
  return { label: "Busy", className: "bg-brand-orange text-white" };
};

const SaccoRoutes = () => {
  const sacco = getDemoSacco();
  const { orders } = useOrders();
  const saccoOrders = getSaccoOrders(orders, sacco.id);
  const routes = getRoutesBySacco(sacco.id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Routes</h1>
        <p className="text-muted-foreground mt-1">Delivery routes operated by {sacco.name}.</p>
      </div>

      {routes.length === 0 ? (
        <Card>
          <CardContent className="text-center py-16">
            <div className="h-14 w-14 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
              <RouteOff className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="font-medium text-foreground">No routes configured</p>
            <p className="text-sm text-muted-foreground mt-1">This SACCO has no delivery routes set up yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {routes.map((route) => {
            const routeStages = getStagesByRoute(route.id);
            const activeOrders = saccoOrders.filter((o) => o.routeId === route.id && o.status !== "delivered").length;
            const deliveredOrders = saccoOrders.filter((o) => o.routeId === route.id && o.status === "delivered").length;
            const status = activityStatus(activeOrders);

            return (
              <Card key={route.id}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <p className="font-semibold text-foreground">{route.from} → {route.to}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Route ID: {route.id}</p>
                    </div>
                    <Badge className={status.className}>{status.label}</Badge>
                  </div>

                  {/* Stage flow */}
                  <div className="mb-4">
                    {routeStages.map((stage, index) => (
                      <div key={stage.id} className="flex items-center gap-2">
                        <div className="flex flex-col items-center">
                          <div className={cn("h-2.5 w-2.5 rounded-full", index === 0 ? "bg-secondary" : "bg-primary")} />
                          {index < routeStages.length - 1 && <div className="w-0.5 h-6 bg-border" />}
                        </div>
                        <span className="text-sm text-foreground pb-1">{stage.name}</span>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">Travel Time</p>
                        <p className="font-medium text-foreground">{route.estimatedTime}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wallet className="h-4 w-4 text-muted-foreground shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">Delivery Fee</p>
                        <p className="font-medium text-foreground">{formatPrice(route.price)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-muted-foreground shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">Orders Currently Using Route</p>
                        <p className="font-medium text-foreground">{activeOrders}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">Delivered on this Route</p>
                        <p className="font-medium text-foreground">{deliveredOrders}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SaccoRoutes;
