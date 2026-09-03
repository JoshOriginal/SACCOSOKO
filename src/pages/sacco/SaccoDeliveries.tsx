import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OrderStatusBadge } from "@/components/orders/OrderStatusBadge";
import { useOrders } from "@/hooks/useOrders";
import { getDemoSacco } from "@/data/demoSacco";
import { getSaccoOrders, isToday } from "@/lib/saccoOrders";
import { cn } from "@/lib/utils";
import { Truck, CalendarClock, PackageCheck, Wallet, Inbox } from "lucide-react";
import { OrderStatus } from "@/types";

type DeliveryFilter = "all" | "pending" | "in_transit" | "at_stage" | "delivered";

const DELIVERY_FILTERS: { value: DeliveryFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "in_transit", label: "In Transit" },
  { value: "at_stage", label: "At Stage" },
  { value: "delivered", label: "Delivered" },
];

const matchesDeliveryFilter = (status: OrderStatus, filter: DeliveryFilter): boolean => {
  switch (filter) {
    case "all":
      return true;
    case "pending":
      return status === "ready_for_sacco" || status === "picked-up";
    case "in_transit":
      return status === "in-transit";
    case "at_stage":
      return status === "at-stage";
    case "delivered":
      return status === "delivered";
    default:
      return true;
  }
};

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-KE", { style: "currency", currency: "KES", minimumFractionDigits: 0 }).format(price);

const SaccoDeliveries = () => {
  const sacco = getDemoSacco();
  const { orders } = useOrders();
  const [filter, setFilter] = useState<DeliveryFilter>("all");

  const saccoOrders = getSaccoOrders(orders, sacco.id);
  const filtered = saccoOrders
    .filter((o) => matchesDeliveryFilter(o.status, filter))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const activeDeliveries = saccoOrders.filter((o) => o.status !== "delivered").length;
  const todaysDeliveries = saccoOrders.filter((o) => isToday(o.createdAt)).length;
  const completedDeliveries = saccoOrders.filter((o) => o.status === "delivered").length;
  const totalRevenue = saccoOrders.reduce((sum, o) => sum + o.deliveryFee, 0);
  const todaysRevenue = saccoOrders.filter((o) => isToday(o.createdAt)).reduce((sum, o) => sum + o.deliveryFee, 0);

  const summary = [
    { icon: Truck, label: "Active Deliveries", value: String(activeDeliveries) },
    { icon: CalendarClock, label: "Today's Deliveries", value: String(todaysDeliveries) },
    { icon: PackageCheck, label: "Completed Deliveries", value: String(completedDeliveries) },
    { icon: Wallet, label: "Delivery Revenue (Demo)", value: formatPrice(totalRevenue) },
  ];

  const estimatedArrival = (createdAt: string, status: OrderStatus) =>
    status === "delivered"
      ? "Delivered"
      : new Date(new Date(createdAt).getTime() + 3 * 60 * 60 * 1000).toLocaleString("en-KE", {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
        });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Deliveries</h1>
        <p className="text-muted-foreground mt-1">Logistics operations view for {sacco.name}.</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {summary.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4">
              <div className="h-9 w-9 rounded-lg bg-brand-light-blue flex items-center justify-center mb-3">
                <s.icon className="h-4 w-4 text-secondary" />
              </div>
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className="text-lg sm:text-xl font-bold text-foreground mt-0.5 truncate">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <p className="text-xs text-muted-foreground -mt-3">
        Today's Delivery Revenue: {formatPrice(todaysRevenue)}. All figures are demo data from seeded and locally placed orders — not real SACCO revenue.
      </p>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {DELIVERY_FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={cn(
              "px-3 py-1.5 rounded-full text-sm font-medium border transition-colors",
              filter === f.value
                ? "bg-secondary text-secondary-foreground border-secondary"
                : "bg-card text-foreground border-border hover:border-secondary/40"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <Card>
        <CardContent className="p-0">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <div className="h-14 w-14 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
                <Inbox className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="font-medium text-foreground">No deliveries in this view</p>
              <p className="text-sm text-muted-foreground mt-1">Try a different filter.</p>
            </div>
          ) : (
            <>
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs text-muted-foreground border-b border-border">
                      <th className="py-3 px-4 font-medium">Order #</th>
                      <th className="py-3 px-4 font-medium">Customer</th>
                      <th className="py-3 px-4 font-medium">Seller</th>
                      <th className="py-3 px-4 font-medium">Route</th>
                      <th className="py-3 px-4 font-medium">Destination Stage</th>
                      <th className="py-3 px-4 font-medium">Delivery Fee</th>
                      <th className="py-3 px-4 font-medium">Status</th>
                      <th className="py-3 px-4 font-medium">Est. Arrival</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((order) => {
                      const sellers = [...new Set(order.items.map((i) => i.seller))].join(", ");
                      return (
                        <tr key={order.id} className="border-b border-border last:border-0 hover:bg-muted/40">
                          <td className="py-3 px-4 font-medium text-foreground whitespace-nowrap">
                            <Link to={`/sacco/orders/${order.id}`} className="hover:text-secondary">{order.id}</Link>
                          </td>
                          <td className="py-3 px-4 text-foreground whitespace-nowrap">{order.customerName}</td>
                          <td className="py-3 px-4 text-muted-foreground max-w-[140px] truncate">{sellers}</td>
                          <td className="py-3 px-4 text-muted-foreground whitespace-nowrap">{order.routeLabel ?? "—"}</td>
                          <td className="py-3 px-4 text-muted-foreground whitespace-nowrap">{order.stageLabel ?? "—"}</td>
                          <td className="py-3 px-4 text-foreground whitespace-nowrap">{formatPrice(order.deliveryFee)}</td>
                          <td className="py-3 px-4"><OrderStatusBadge status={order.status} /></td>
                          <td className="py-3 px-4 text-muted-foreground whitespace-nowrap">{estimatedArrival(order.createdAt, order.status)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="md:hidden divide-y divide-border">
                {filtered.map((order) => (
                  <Link key={order.id} to={`/sacco/orders/${order.id}`} className="block p-4 hover:bg-muted/40">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-foreground text-sm">{order.id}</span>
                      <OrderStatusBadge status={order.status} />
                    </div>
                    <p className="text-sm text-muted-foreground">{order.customerName}</p>
                    <p className="text-xs text-muted-foreground mt-1">{order.routeLabel} → {order.stageLabel}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-muted-foreground">Fee {formatPrice(order.deliveryFee)}</span>
                      <span className="text-xs text-muted-foreground">ETA {estimatedArrival(order.createdAt, order.status)}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SaccoDeliveries;
