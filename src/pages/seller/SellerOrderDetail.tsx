import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { OrderStatusBadge } from "@/components/orders/OrderStatusBadge";
import { OrderTimeline } from "@/components/orders/OrderTimeline";
import { useOrders } from "@/hooks/useOrders";
import { getDemoSeller } from "@/data/demoSeller";
import { getSellerItems, getSellerItemsTotal, getSellerNextAction, orderBelongsToSeller } from "@/lib/sellerOrders";
import { ChevronLeft, User, Phone, MapPin, Truck, PackageSearch, CheckCircle2 } from "lucide-react";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-KE", { style: "currency", currency: "KES", minimumFractionDigits: 0 }).format(price);

const SellerOrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const seller = getDemoSeller();
  const { getOrderById, updateOrderStatus } = useOrders();

  const order = orderId ? getOrderById(orderId) : undefined;

  if (!order || !orderBelongsToSeller(order, seller.id)) {
    return (
      <div className="text-center py-16">
        <div className="h-16 w-16 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
          <PackageSearch className="h-8 w-8 text-muted-foreground" />
        </div>
        <h1 className="text-xl font-semibold text-foreground mb-2">Order not found</h1>
        <p className="text-muted-foreground mb-6">
          This order doesn't exist or doesn't belong to your store.
        </p>
        <Link to="/seller/orders">
          <Button variant="outline">Back to Orders</Button>
        </Link>
      </div>
    );
  }

  const items = getSellerItems(order, seller.id);
  const itemsTotal = getSellerItemsTotal(order, seller.id);
  const action = getSellerNextAction(order.status);

  const estimatedArrival = new Date(new Date(order.createdAt).getTime() + 3 * 60 * 60 * 1000).toLocaleString("en-KE", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  const handleAdvance = () => {
    if (!action) return;
    updateOrderStatus(order.id, action.nextStatus);
    toast({ title: action.label, description: `Order ${order.id} is now ${action.nextStatus.replace(/_/g, " ")}.` });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate("/seller/orders")}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-xl font-bold text-foreground">{order.id}</h1>
          <p className="text-sm text-muted-foreground">Placed {new Date(order.createdAt).toLocaleDateString("en-KE", { month: "short", day: "numeric", year: "numeric" })}</p>
        </div>
        <OrderStatusBadge status={order.status} className="ml-auto" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Order information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Order Information</CardTitle>
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
              </div>

              <div className="border-t border-border pt-4">
                <p className="text-sm font-medium text-foreground mb-3">Items ({items.length})</p>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.productId} className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="h-12 w-12 rounded-lg object-cover bg-muted shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty {item.quantity} × {formatPrice(item.price)}</p>
                      </div>
                      <span className="text-sm font-semibold text-foreground shrink-0">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center border-t border-border mt-4 pt-3">
                  <span className="text-sm font-medium text-foreground">Your items total</span>
                  <span className="text-base font-bold text-primary">{formatPrice(itemsTotal)}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Excludes delivery fee and tax, which are charged to the customer for the whole order.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Delivery information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Truck className="h-4 w-4" />
                Delivery Information
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
                  <p className="font-medium text-foreground">{order.saccoLabel ?? "Not yet assigned"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Route</p>
                  <p className="font-medium text-foreground">{order.routeLabel ?? "Not yet assigned"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Stage</p>
                  <p className="font-medium text-foreground">{order.stageLabel ?? "Not yet assigned"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Estimated Arrival</p>
                  <p className="font-medium text-foreground">
                    {order.status === "delivered" ? "Delivered" : estimatedArrival}
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <p className="text-muted-foreground">Customer Delivery Address</p>
                    <p className="font-medium text-foreground">{order.deliveryAddress}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline — shared with the customer Track Order page */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Delivery Progress</CardTitle>
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
              <CardTitle className="text-base">
                {order.status === "ready_for_sacco" ? "Ready for SACCO Handover" : "Order Actions"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {order.status === "ready_for_sacco" && (
                <div className="rounded-lg bg-brand-light-orange border border-brand-orange/20 p-3 space-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">SACCO</span>
                    <span className="font-medium text-foreground">{order.saccoLabel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Route</span>
                    <span className="font-medium text-foreground">{order.routeLabel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Stage</span>
                    <span className="font-medium text-foreground">{order.stageLabel}</span>
                  </div>
                </div>
              )}

              {action ? (
                <Button className="w-full" onClick={handleAdvance}>
                  {action.label}
                </Button>
              ) : order.status === "delivered" ? (
                <div className="flex items-center gap-2 text-sm text-primary bg-brand-light-green rounded-lg p-3">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  This order has been delivered.
                </div>
              ) : order.status === "cancelled" ? (
                <div className="text-sm text-destructive bg-destructive/10 rounded-lg p-3">
                  This order was cancelled.
                </div>
              ) : (
                <div className="text-sm text-muted-foreground bg-muted rounded-lg p-3">
                  This order is now with SACCO-SOKO logistics. Status updates from here (in transit, arrived at
                  stage, delivered) are managed by SACCO operations, not the seller.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SellerOrderDetail;
