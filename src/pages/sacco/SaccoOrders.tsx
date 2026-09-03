import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OrderStatusBadge } from "@/components/orders/OrderStatusBadge";
import { useOrders } from "@/hooks/useOrders";
import { getDemoSacco } from "@/data/demoSacco";
import {
  getSaccoOrders,
  matchesSaccoFilter,
  getSaccoNextAction,
  SACCO_ORDER_FILTERS,
  SaccoOrderFilter,
} from "@/lib/saccoOrders";
import { cn } from "@/lib/utils";
import { Inbox } from "lucide-react";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-KE", { style: "currency", currency: "KES", minimumFractionDigits: 0 }).format(price);

const SaccoOrders = () => {
  const sacco = getDemoSacco();
  const { orders, updateOrderStatus } = useOrders();
  const [filter, setFilter] = useState<SaccoOrderFilter>("all");

  const saccoOrders = getSaccoOrders(orders, sacco.id)
    .filter((o) => matchesSaccoFilter(o.status, filter))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const handleAction = (orderId: string) => {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return;
    const action = getSaccoNextAction(order.status);
    if (action) updateOrderStatus(orderId, action.nextStatus);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Orders</h1>
        <p className="text-muted-foreground mt-1">Orders moving through {sacco.name}.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {SACCO_ORDER_FILTERS.map((f) => (
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
          {saccoOrders.length === 0 ? (
            <div className="text-center py-16">
              <div className="h-14 w-14 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
                <Inbox className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="font-medium text-foreground">No orders in this view</p>
              <p className="text-sm text-muted-foreground mt-1">Try a different filter, or check back once sellers hand over new orders.</p>
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs text-muted-foreground border-b border-border">
                      <th className="py-3 px-4 font-medium">Order #</th>
                      <th className="py-3 px-4 font-medium">Seller</th>
                      <th className="py-3 px-4 font-medium">Customer</th>
                      <th className="py-3 px-4 font-medium">Route</th>
                      <th className="py-3 px-4 font-medium">Stage</th>
                      <th className="py-3 px-4 font-medium">Delivery Fee</th>
                      <th className="py-3 px-4 font-medium">Status</th>
                      <th className="py-3 px-4 font-medium text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {saccoOrders.map((order) => {
                      const sellers = [...new Set(order.items.map((i) => i.seller))].join(", ");
                      const action = getSaccoNextAction(order.status);
                      return (
                        <tr key={order.id} className="border-b border-border last:border-0 hover:bg-muted/40">
                          <td className="py-3 px-4 font-medium text-foreground whitespace-nowrap">
                            <Link to={`/sacco/orders/${order.id}`} className="hover:text-secondary">{order.id}</Link>
                          </td>
                          <td className="py-3 px-4 text-muted-foreground max-w-[160px] truncate">{sellers}</td>
                          <td className="py-3 px-4 text-foreground whitespace-nowrap">{order.customerName}</td>
                          <td className="py-3 px-4 text-muted-foreground whitespace-nowrap">{order.routeLabel ?? "—"}</td>
                          <td className="py-3 px-4 text-muted-foreground whitespace-nowrap">{order.stageLabel ?? "—"}</td>
                          <td className="py-3 px-4 text-foreground whitespace-nowrap">{formatPrice(order.deliveryFee)}</td>
                          <td className="py-3 px-4"><OrderStatusBadge status={order.status} /></td>
                          <td className="py-3 px-4 text-right whitespace-nowrap">
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
              <div className="md:hidden divide-y divide-border">
                {saccoOrders.map((order) => {
                  const action = getSaccoNextAction(order.status);
                  return (
                    <div key={order.id} className="p-4">
                      <div className="flex items-center justify-between mb-1">
                        <Link to={`/sacco/orders/${order.id}`} className="font-medium text-foreground text-sm hover:text-secondary">
                          {order.id}
                        </Link>
                        <OrderStatusBadge status={order.status} />
                      </div>
                      <p className="text-sm text-muted-foreground">{order.customerName}</p>
                      <p className="text-xs text-muted-foreground mt-1">{order.routeLabel} · {order.stageLabel}</p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-sm font-semibold text-foreground">Fee {formatPrice(order.deliveryFee)}</span>
                        {action ? (
                          <Button size="sm" onClick={() => handleAction(order.id)}>{action.label}</Button>
                        ) : (
                          <Link to={`/sacco/orders/${order.id}`}>
                            <Button variant="outline" size="sm">View</Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SaccoOrders;
