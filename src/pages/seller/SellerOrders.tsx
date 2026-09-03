import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { OrderStatusBadge } from "@/components/orders/OrderStatusBadge";
import { useOrders } from "@/hooks/useOrders";
import { getDemoSeller } from "@/data/demoSeller";
import {
  orderBelongsToSeller,
  getSellerItems,
  getSellerItemsTotal,
  matchesSellerFilter,
  getSellerNextAction,
  SELLER_ORDER_FILTERS,
  SellerOrderFilter,
} from "@/lib/sellerOrders";
import { cn } from "@/lib/utils";
import { Inbox } from "lucide-react";
import { OrderStatus } from "@/types";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-KE", { style: "currency", currency: "KES", minimumFractionDigits: 0 }).format(price);

const SellerOrders = () => {
  const seller = getDemoSeller();
  const { orders, updateOrderStatus } = useOrders();
  const { toast } = useToast();
  const [filter, setFilter] = useState<SellerOrderFilter>("all");

  const sellerOrders = orders
    .filter((o) => orderBelongsToSeller(o, seller.id))
    .filter((o) => matchesSellerFilter(o.status, filter))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const handleAction = (orderId: string, nextStatus: OrderStatus, label: string) => {
    updateOrderStatus(orderId, nextStatus);
    toast({ title: label, description: `Order ${orderId} updated.` });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Orders</h1>
        <p className="text-muted-foreground mt-1">Manage orders for {seller.businessName}.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {SELLER_ORDER_FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={cn(
              "px-3 py-1.5 rounded-full text-sm font-medium border transition-colors",
              filter === f.value
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card text-foreground border-border hover:border-primary/40"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <Card>
        <CardContent className="p-0">
          {sellerOrders.length === 0 ? (
            <div className="text-center py-16">
              <div className="h-14 w-14 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
                <Inbox className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="font-medium text-foreground">No orders in this view</p>
              <p className="text-sm text-muted-foreground mt-1">Try a different filter, or check back once new orders come in.</p>
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs text-muted-foreground border-b border-border">
                      <th className="py-3 px-4 font-medium">Order #</th>
                      <th className="py-3 px-4 font-medium">Customer</th>
                      <th className="py-3 px-4 font-medium">Items</th>
                      <th className="py-3 px-4 font-medium">Qty</th>
                      <th className="py-3 px-4 font-medium">Total</th>
                      <th className="py-3 px-4 font-medium">SACCO / Route / Stage</th>
                      <th className="py-3 px-4 font-medium">Status</th>
                      <th className="py-3 px-4 font-medium text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sellerOrders.map((order) => {
                      const items = getSellerItems(order, seller.id);
                      const qty = items.reduce((sum, i) => sum + i.quantity, 0);
                      const action = getSellerNextAction(order.status);
                      return (
                        <tr key={order.id} className="border-b border-border last:border-0 hover:bg-muted/40">
                          <td className="py-3 px-4 font-medium text-foreground whitespace-nowrap">
                            <Link to={`/seller/orders/${order.id}`} className="hover:text-primary">{order.id}</Link>
                          </td>
                          <td className="py-3 px-4 text-foreground whitespace-nowrap">{order.customerName}</td>
                          <td className="py-3 px-4 text-muted-foreground max-w-[200px] truncate">
                            {items.map((i) => i.name).join(", ")}
                          </td>
                          <td className="py-3 px-4 text-foreground">{qty}</td>
                          <td className="py-3 px-4 font-semibold text-foreground whitespace-nowrap">
                            {formatPrice(getSellerItemsTotal(order, seller.id))}
                          </td>
                          <td className="py-3 px-4 text-muted-foreground whitespace-nowrap">
                            {order.saccoLabel ? `${order.saccoLabel} · ${order.routeLabel} · ${order.stageLabel}` : "—"}
                          </td>
                          <td className="py-3 px-4"><OrderStatusBadge status={order.status} /></td>
                          <td className="py-3 px-4 text-right whitespace-nowrap">
                            {action ? (
                              <Button size="sm" onClick={() => handleAction(order.id, action.nextStatus, action.label)}>
                                {action.label}
                              </Button>
                            ) : (
                              <Link to={`/seller/orders/${order.id}`}>
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
                {sellerOrders.map((order) => {
                  const items = getSellerItems(order, seller.id);
                  const action = getSellerNextAction(order.status);
                  return (
                    <div key={order.id} className="p-4">
                      <div className="flex items-center justify-between mb-1">
                        <Link to={`/seller/orders/${order.id}`} className="font-medium text-foreground text-sm hover:text-primary">
                          {order.id}
                        </Link>
                        <OrderStatusBadge status={order.status} />
                      </div>
                      <p className="text-sm text-muted-foreground">{order.customerName}</p>
                      <p className="text-xs text-muted-foreground truncate mt-1">{items.map((i) => i.name).join(", ")}</p>
                      {order.saccoLabel && (
                        <p className="text-xs text-muted-foreground mt-1">{order.saccoLabel} · {order.routeLabel} · {order.stageLabel}</p>
                      )}
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-sm font-semibold text-foreground">
                          {formatPrice(getSellerItemsTotal(order, seller.id))}
                        </span>
                        {action ? (
                          <Button size="sm" onClick={() => handleAction(order.id, action.nextStatus, action.label)}>
                            {action.label}
                          </Button>
                        ) : (
                          <Link to={`/seller/orders/${order.id}`}>
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

export default SellerOrders;
