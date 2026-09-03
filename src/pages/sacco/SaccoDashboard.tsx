import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OrderStatusBadge } from "@/components/orders/OrderStatusBadge";
import { useOrders } from "@/hooks/useOrders";
import { getDemoSacco } from "@/data/demoSacco";
import { getSaccoOrders, getSaccoNextAction, isToday } from "@/lib/saccoOrders";
import { CalendarClock, Truck, MapPin, PackageCheck, Clock, Wallet, ArrowRight, Inbox, Store, Users } from "lucide-react";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-KE", { style: "currency", currency: "KES", minimumFractionDigits: 0 }).format(price);

const SaccoDashboard = () => {
  const sacco = getDemoSacco();
  const { orders, updateOrderStatus } = useOrders();

  const saccoOrders = getSaccoOrders(orders, sacco.id).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const ordersToday = saccoOrders.filter((o) => isToday(o.createdAt)).length;
  const pendingHandover = saccoOrders.filter((o) => o.status === "ready_for_sacco").length;
  const inTransit = saccoOrders.filter((o) => o.status === "in-transit").length;
  const atStage = saccoOrders.filter((o) => o.status === "at-stage").length;
  const delivered = saccoOrders.filter((o) => o.status === "delivered").length;
  const deliveryRevenue = saccoOrders.reduce((sum, o) => sum + o.deliveryFee, 0);

  const stats = [
    { icon: CalendarClock, label: "Orders Today", value: String(ordersToday) },
    { icon: Clock, label: "Pending Handover", value: String(pendingHandover) },
    { icon: Truck, label: "In Transit", value: String(inTransit) },
    { icon: MapPin, label: "At Destination Stage", value: String(atStage) },
    { icon: PackageCheck, label: "Delivered", value: String(delivered) },
    { icon: Wallet, label: "Delivery Revenue", value: formatPrice(deliveryRevenue) },
  ];

  const recentOrders = saccoOrders.slice(0, 6);

  const handleAction = (orderId: string) => {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return;
    const action = getSaccoNextAction(order.status);
    if (action) updateOrderStatus(orderId, action.nextStatus);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{sacco.name} Operations</h1>
        <p className="text-muted-foreground mt-1">Delivery activity across your transport network.</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <div className="h-9 w-9 rounded-lg bg-brand-light-blue flex items-center justify-center mb-3">
                <stat.icon className="h-4 w-4 text-secondary" />
              </div>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-foreground mt-0.5 break-words">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>Recent Orders</CardTitle>
          <Link to="/sacco/orders">
            <Button variant="outline" size="sm" className="gap-1">
              View All
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {recentOrders.length === 0 ? (
            <div className="text-center py-12">
              <div className="h-14 w-14 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
                <Inbox className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="font-medium text-foreground">No orders yet</p>
              <p className="text-sm text-muted-foreground mt-1">
                Orders handed over by sellers on {sacco.name} routes will show up here.
              </p>
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs text-muted-foreground border-b border-border">
                      <th className="py-2 pr-4 font-medium">Order #</th>
                      <th className="py-2 pr-4 font-medium">Seller</th>
                      <th className="py-2 pr-4 font-medium">Customer</th>
                      <th className="py-2 pr-4 font-medium">Route</th>
                      <th className="py-2 pr-4 font-medium">Stage</th>
                      <th className="py-2 pr-4 font-medium">Order Value</th>
                      <th className="py-2 pr-4 font-medium">Delivery Fee</th>
                      <th className="py-2 pr-4 font-medium">Status</th>
                      <th className="py-2 pr-2 font-medium text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => {
                      const sellers = [...new Set(order.items.map((i) => i.seller))].join(", ");
                      const action = getSaccoNextAction(order.status);
                      return (
                        <tr key={order.id} className="border-b border-border last:border-0 hover:bg-muted/40">
                          <td className="py-3 pr-4 font-medium text-foreground whitespace-nowrap">{order.id}</td>
                          <td className="py-3 pr-4 text-muted-foreground whitespace-nowrap max-w-[140px] truncate">{sellers}</td>
                          <td className="py-3 pr-4 text-foreground whitespace-nowrap">{order.customerName}</td>
                          <td className="py-3 pr-4 text-muted-foreground whitespace-nowrap">{order.routeLabel ?? "—"}</td>
                          <td className="py-3 pr-4 text-muted-foreground whitespace-nowrap">{order.stageLabel ?? "—"}</td>
                          <td className="py-3 pr-4 text-foreground whitespace-nowrap">{formatPrice(order.subtotal)}</td>
                          <td className="py-3 pr-4 text-foreground whitespace-nowrap">{formatPrice(order.deliveryFee)}</td>
                          <td className="py-3 pr-4"><OrderStatusBadge status={order.status} /></td>
                          <td className="py-3 pr-2 text-right whitespace-nowrap">
                            {action ? (
                              <Button size="sm" onClick={() => handleAction(order.id)}>{action.label}</Button>
                            ) : (
                              <Link to={`/sacco/orders/${order.id}`}>
                                <Button variant="outline" size="sm">View</Button>
                              </Link>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="md:hidden space-y-3">
                {recentOrders.map((order) => (
                  <Link
                    key={order.id}
                    to={`/sacco/orders/${order.id}`}
                    className="block rounded-lg border border-border p-3 hover:border-secondary/40 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-foreground text-sm">{order.id}</span>
                      <OrderStatusBadge status={order.status} />
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{order.customerName} · {order.routeLabel}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-muted-foreground">Fee {formatPrice(order.deliveryFee)}</span>
                      <span className="text-sm font-semibold text-foreground">{formatPrice(order.subtotal)}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Business value teaser — full case lives on its own page */}
      <Card className="bg-gradient-hero-blue border-0 text-primary-foreground">
        <CardContent className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold">Your Transport Network, Now Powering Commerce</h2>
            <div className="flex flex-wrap items-center gap-2 mt-3 text-sm font-medium">
              <span className="flex items-center gap-1.5 bg-primary-foreground/15 rounded-full px-3 py-1.5">
                <Store className="h-3.5 w-3.5" /> Sellers
              </span>
              <ArrowRight className="h-4 w-4 opacity-70" />
              <span className="flex items-center gap-1.5 bg-primary-foreground/15 rounded-full px-3 py-1.5">
                <Truck className="h-3.5 w-3.5" /> SACCO Network
              </span>
              <ArrowRight className="h-4 w-4 opacity-70" />
              <span className="flex items-center gap-1.5 bg-primary-foreground/15 rounded-full px-3 py-1.5">
                <MapPin className="h-3.5 w-3.5" /> Stages
              </span>
              <ArrowRight className="h-4 w-4 opacity-70" />
              <span className="flex items-center gap-1.5 bg-primary-foreground/15 rounded-full px-3 py-1.5">
                <Users className="h-3.5 w-3.5" /> Customers
              </span>
            </div>
          </div>
          <Link to="/sacco/business-value" className="shrink-0">
            <Button variant="hero-secondary" className="gap-2 w-full sm:w-auto">
              View Full Business Case
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default SaccoDashboard;
