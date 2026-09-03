import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useOrders } from "@/hooks/useOrders";
import { getDemoSacco } from "@/data/demoSacco";
import { getRoutesBySacco, getRouteById } from "@/data/routes";
import { getStagesByRoute } from "@/data/stages";
import { getSaccoOrders } from "@/lib/saccoOrders";
import { MapPin, PackageCheck, PackageOpen, MapPinOff } from "lucide-react";

const activityStatus = (total: number) => {
  if (total === 0) return { label: "Low Activity", className: "bg-muted text-muted-foreground" };
  if (total <= 2) return { label: "Active", className: "bg-primary text-primary-foreground" };
  return { label: "Busy", className: "bg-brand-orange text-white" };
};

const SaccoStages = () => {
  const sacco = getDemoSacco();
  const { orders } = useOrders();
  const saccoOrders = getSaccoOrders(orders, sacco.id);
  const routes = getRoutesBySacco(sacco.id);
  const stages = routes.flatMap((r) => getStagesByRoute(r.id));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Stages</h1>
        <p className="text-muted-foreground mt-1">Pickup and drop-off points on {sacco.name}'s routes.</p>
      </div>

      {stages.length === 0 ? (
        <Card>
          <CardContent className="text-center py-16">
            <div className="h-14 w-14 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
              <MapPinOff className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="font-medium text-foreground">No stages configured</p>
            <p className="text-sm text-muted-foreground mt-1">This SACCO has no stages set up yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {stages.map((stage) => {
            const route = getRouteById(stage.routeId);
            const awaitingPickup = saccoOrders.filter((o) => o.stageId === stage.id && o.status === "at-stage").length;
            const delivered = saccoOrders.filter((o) => o.stageId === stage.id && o.status === "delivered").length;
            const status = activityStatus(awaitingPickup + delivered);

            return (
              <Card key={stage.id}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="h-9 w-9 rounded-lg bg-brand-light-blue flex items-center justify-center shrink-0">
                      <MapPin className="h-4 w-4 text-secondary" />
                    </div>
                    <Badge className={status.className}>{status.label}</Badge>
                  </div>
                  <p className="font-semibold text-foreground">{stage.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{route ? `${route.from} → ${route.to}` : "—"}</p>
                  <p className="text-xs text-muted-foreground">{stage.location}</p>

                  <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-border text-sm">
                    <div className="flex items-center gap-2">
                      <PackageOpen className="h-4 w-4 text-muted-foreground shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">Awaiting Pickup</p>
                        <p className="font-medium text-foreground">{awaitingPickup}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <PackageCheck className="h-4 w-4 text-muted-foreground shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">Delivered</p>
                        <p className="font-medium text-foreground">{delivered}</p>
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

export default SaccoStages;
