import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useOrders } from "@/hooks/useOrders";
import { computeBusinessMetrics } from "@/lib/businessMetrics";
import {
  Store,
  Truck,
  Route as RouteIcon,
  MapPin,
  Users,
  ArrowRight,
  ShoppingBag,
  Wallet,
  Percent,
  TrendingUp,
  PackageCheck,
  BarChart3,
  Receipt,
  Megaphone,
  Sparkles,
  Info,
} from "lucide-react";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-KE", { style: "currency", currency: "KES", minimumFractionDigits: 0 }).format(price);

const flowNodes = [
  { icon: Store, label: "Sellers" },
  { icon: Truck, label: "SACCO Network" },
  { icon: RouteIcon, label: "Routes" },
  { icon: MapPin, label: "Stages" },
  { icon: Users, label: "Customers" },
];

const supportingPoints = [
  "Creates an additional digital commerce channel",
  "Increases parcel volume on existing routes",
  "Leverages routes and stages already in operation",
  "Gives local businesses access to online customers",
  "Opens potential new revenue from delivery and commerce",
];

const revenueOpportunities = [
  {
    icon: Wallet,
    title: "Delivery Fees",
    description: "A potential revenue channel from a delivery fee charged on every order moved through SACCO routes and stages.",
  },
  {
    icon: Percent,
    title: "Seller Commissions",
    description: "Could generate revenue through a small commission on sales made by sellers using the platform.",
  },
  {
    icon: Receipt,
    title: "Seller Subscriptions",
    description: "A future opportunity for premium seller subscription tiers with added tools and visibility.",
  },
  {
    icon: Megaphone,
    title: "Promoted Products",
    description: "Potential revenue from sellers paying to feature products in search results and category pages.",
  },
  {
    icon: Sparkles,
    title: "Transaction Fees",
    description: "Could generate revenue through a small processing fee applied to completed transactions.",
  },
];

const SaccoBusinessValue = () => {
  const { orders } = useOrders();
  const metrics = computeBusinessMetrics(orders);

  const metricCards = [
    { icon: ShoppingBag, label: "Total Orders", value: String(metrics.totalOrders) },
    { icon: BarChart3, label: "Total Order Value", value: formatPrice(metrics.totalOrderValue) },
    { icon: Wallet, label: "Delivery Revenue", value: formatPrice(metrics.deliveryRevenue) },
    { icon: TrendingUp, label: "Average Order Value", value: formatPrice(metrics.averageOrderValue) },
    { icon: PackageCheck, label: "Delivered Orders", value: String(metrics.deliveredOrders) },
    { icon: Truck, label: "Active Deliveries", value: String(metrics.activeDeliveries) },
    { icon: Store, label: "Sellers on Platform", value: String(metrics.sellerCount) },
    { icon: RouteIcon, label: "Routes", value: String(metrics.routeCount) },
    { icon: MapPin, label: "Stages", value: String(metrics.stageCount) },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Business Value</h1>
        <p className="text-muted-foreground mt-1">The case for turning your transport network into a commerce network.</p>
      </div>

      {/* Headline + flow */}
      <Card className="bg-gradient-hero-blue border-0 text-primary-foreground">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold">Your Transport Network, Now Powering Commerce</h2>
          <p className="text-primary-foreground/85 text-sm mt-2 max-w-2xl">
            SACCO-SOKO connects online sellers with customers using the routes and stages your SACCO already runs every day.
          </p>

          <div className="flex flex-wrap items-center gap-2 mt-5 text-sm font-medium">
            {flowNodes.map((node, index) => (
              <div key={node.label} className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 bg-primary-foreground/15 rounded-full px-3 py-1.5">
                  <node.icon className="h-3.5 w-3.5" /> {node.label}
                </span>
                {index < flowNodes.length - 1 && <ArrowRight className="h-4 w-4 opacity-70" />}
              </div>
            ))}
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-6 text-sm">
            {supportingPoints.map((point) => (
              <li key={point} className="flex items-start gap-2 opacity-90">
                <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground/70 mt-2 shrink-0" />
                {point}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Business metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Business Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {metricCards.map((m) => (
              <div key={m.label} className="rounded-lg border border-border p-4">
                <div className="h-9 w-9 rounded-lg bg-brand-light-blue flex items-center justify-center mb-3">
                  <m.icon className="h-4 w-4 text-secondary" />
                </div>
                <p className="text-xs text-muted-foreground">{m.label}</p>
                <p className="text-base sm:text-lg lg:text-xl font-bold text-foreground mt-0.5 break-words">{m.value}</p>
              </div>
            ))}
          </div>
          <div className="flex items-start gap-2 mt-4 p-3 rounded-lg bg-muted text-xs text-muted-foreground">
            <Info className="h-4 w-4 shrink-0 mt-0.5" />
            <p>
              These figures are calculated live from the app's demo data (seeded orders plus anything placed during this
              session) — they illustrate what the dashboard would show, not real SACCO revenue or transaction history.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Revenue opportunities */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Potential Revenue Opportunities</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            None of these are implemented or active today — they're future directions the platform could support.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {revenueOpportunities.map((op) => (
              <div key={op.title} className="flex items-start gap-3 rounded-lg border border-border p-4">
                <div className="h-9 w-9 rounded-lg bg-brand-light-orange flex items-center justify-center shrink-0">
                  <op.icon className="h-4 w-4 text-brand-orange" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{op.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{op.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SaccoBusinessValue;
