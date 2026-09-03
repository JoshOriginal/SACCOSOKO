import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useOrders } from "@/hooks/useOrders";
import { getDemoSacco } from "@/data/demoSacco";
import { getRoutesBySacco } from "@/data/routes";
import { getStagesByRoute } from "@/data/stages";
import { getSaccoOrders } from "@/lib/saccoOrders";
import { Building2, Phone, MapPin, Route, Milestone, Info } from "lucide-react";

const SaccoProfile = () => {
  const sacco = getDemoSacco();
  const { orders } = useOrders();
  const routes = getRoutesBySacco(sacco.id);
  const stages = routes.flatMap((r) => getStagesByRoute(r.id));
  const saccoOrders = getSaccoOrders(orders, sacco.id);
  const delivered = saccoOrders.filter((o) => o.status === "delivered").length;

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">SACCO Profile</h1>
        <p className="text-muted-foreground mt-1">This is demo profile data for the SACCO Operations Dashboard preview.</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-xl bg-gradient-hero-blue flex items-center justify-center text-primary-foreground font-bold text-2xl shrink-0">
              {sacco.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg font-bold text-foreground truncate">{sacco.name}</h2>
                <Badge className="bg-secondary text-secondary-foreground gap-1">
                  <Building2 className="h-3 w-3" />
                  Demo SACCO
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{sacco.region}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-4">{sacco.description}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Contact & Operations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="flex items-start gap-3">
              <div className="h-9 w-9 rounded-lg bg-brand-light-blue flex items-center justify-center shrink-0">
                <Phone className="h-4 w-4 text-secondary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="text-sm font-medium text-foreground">{sacco.contactPhone}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-9 w-9 rounded-lg bg-brand-light-blue flex items-center justify-center shrink-0">
                <MapPin className="h-4 w-4 text-secondary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Location</p>
                <p className="text-sm font-medium text-foreground">{sacco.region}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-9 w-9 rounded-lg bg-brand-light-blue flex items-center justify-center shrink-0">
                <Route className="h-4 w-4 text-secondary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Routes</p>
                <p className="text-sm font-medium text-foreground">{routes.length} active routes</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-9 w-9 rounded-lg bg-brand-light-blue flex items-center justify-center shrink-0">
                <Milestone className="h-4 w-4 text-secondary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Stages</p>
                <p className="text-sm font-medium text-foreground">{stages.length} stages</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Routes</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {routes.map((route) => (
              <li key={route.id} className="flex items-center justify-between text-sm border-b border-border last:border-0 pb-2 last:pb-0">
                <span className="text-foreground">{route.from} → {route.to}</span>
                <span className="text-muted-foreground">{route.estimatedTime}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="flex items-start gap-2 p-3 rounded-lg bg-muted text-xs text-muted-foreground">
        <Info className="h-4 w-4 shrink-0 mt-0.5" />
        <p>
          Demo data — this SACCO, its routes/stages and the {delivered} delivered orders shown across the dashboard are illustrative
          and not connected to a real SACCO membership system.
        </p>
      </div>
    </div>
  );
};

export default SaccoProfile;
