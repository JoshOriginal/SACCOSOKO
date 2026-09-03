import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderStatusBadge } from "@/components/orders/OrderStatusBadge";
import { OrderTimeline } from "@/components/orders/OrderTimeline";
import { useOrders } from "@/hooks/useOrders";
import { getDemoSacco } from "@/data/demoSacco";
import { getStagesByRoute } from "@/data/stages";
import { orderBelongsToSacco, isSaccoRelevant, getSaccoNextAction } from "@/lib/saccoOrders";
import { ChevronLeft, User, Phone, Store, Truck, MapPin, PackageSearch, CheckCircle2 } from "lucide-react";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-KE", { style: "currency", currency: "KES", minimumFractionDigits: 0 }).format(price);

const SaccoOrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const sacco = getDemoSacco();
  const { getOrderById, updateOrderStatus } = useOrders();

  const order = orderId ? getOrderById(orderId) : undefined;
  const visibleToSacco = order && orderBelongsToSacco(order, sacco.id) && isSaccoRelevant(order.status);

  if (!order || !visibleToSacco) {
    return (
      <div className="text-center py-16">
        <div className="h-16 w-16 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
          <PackageSearch className="h-8 w-8 text-muted-foreground" />
        </div>
        <h1 className="text-xl font-semibold text-foreground mb-2">
          {order ? "Not available to SACCO operations" : "Order not found"}
        </h1>
        <p className="text-muted-foreground mb-6">
          {order
            ? "This order is still with the seller (or belongs to a different SACCO) and hasn't reached your network yet."
            : "This order doesn't exist."}
        </p>
        <Link to="/sacco/orders">
          <Button variant="outline">Back to Orders</Button>
        </Link>
      </div>
    );
  }

  const action = getSaccoNextAction(order.status);
  const originStage = order.routeId
    ? getStagesByRoute(order.routeId).find((s) => s.id.endsWith("-origin"))
    : undefined;
  const totalQty = order.items.reduce((sum, i) => sum + i.quantity, 0);
  const sellers = [...new Set(order.items.map((i) => i.seller))].join(", ");

  const estimatedArrival = new Date(new Date(order.createdAt).getTime() + 3 * 60 * 60 * 1000).toLocaleString("en-KE", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  const handleAdvance = () => {
    if (!action) return;
    updateOrderStatus(order.id, action.nextStatus);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate("/sacco/orders")}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-xl font-bold text-foreground">{order.id}</h1>
          <p className="text-sm text-muted-foreground">
            Placed {new Date(order.createdAt).toLocaleDateString("en-KE", { month: "short", day: "numeric", year: "numeric" })}
          </p>
        </div>
        <OrderStatusBadge status={order.status} className="ml-auto" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Order */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Order</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-start gap-2">
                  <User className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <p className="text-muted-foreground">Customer</p>
                    <p className="font-medium text-foreground">{order.customerName}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <p className="text-muted-foreground">Phone</p>
                    <p className="font-medium text-foreground">{order.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Store className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <p className="text-muted-foreground">Seller(s)</p>
                    <p className="font-medium text-foreground">{sellers}</p>
                  </div>
                </div>
                <div>
                  <p className="text-muted-foreground">Order Value</p>
                  <p className="font-medium text-foreground">{formatPrice(order.subtotal)}</p>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <p className="text-sm font-medium text-foreground mb-3">Products ({totalQty} {totalQty === 1 ? "item" : "items"})</p>
                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div key={item.productId} className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="h-12 w-12 rounded-lg object-cover bg-muted shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.seller} · Qty {item.quantity} × {formatPrice(item.price)}</p>
                      </div>
                      <span className="text-sm font-semibold text-foreground shrink-0">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delivery */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Truck className="h-4 w-4" />
                Delivery
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Delivery Method</p>
                  <p className="font-medium text-foreground">SACCO Transport Network</p>
                </div>
                <div>
                  <p className="text-muted-foreground">SACCO</p>
                  <p className="font-medium text-foreground">{order.saccoLabel}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Route</p>
                  <p className="font-medium text-foreground">{order.routeLabel}</p>
                </div>
                {originStage && (
                  <div>
                    <p className="text-muted-foreground">Origin Stage</p>
                    <p className="font-medium text-foreground">{originStage.name}</p>
                  </div>
                )}
                <div>
                  <p className="text-muted-foreground">Destination Stage</p>
                  <p className="font-medium text-foreground">{order.stageLabel}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Delivery Fee</p>
                  <p className="font-medium text-foreground">{formatPrice(order.deliveryFee)}</p>
                </div>
                <div className="flex items-start gap-2 sm:col-span-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <p className="text-muted-foreground">Estimated Arrival</p>
                    <p className="font-medium text-foreground">
                      {order.status === "delivered" ? "Delivered" : estimatedArrival}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline — shared with the customer Track Order and Seller Portal pages */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Current Status</CardTitle>
            </CardHeader>
            <CardContent>
              <OrderTimeline order={order} />
            </CardContent>
          </Card>
        </div>

        {/* Action panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Operations Action</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {action ? (
                <Button className="w-full" onClick={handleAdvance}>
                  {action.label}
                </Button>
              ) : order.status === "delivered" ? (
                <div className="flex items-center gap-2 text-sm text-primary bg-brand-light-green rounded-lg p-3">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  Delivery Completed
                </div>
              ) : (
                <div className="text-sm text-muted-foreground bg-muted rounded-lg p-3">
                  No action available for this order right now.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SaccoOrderDetail;
