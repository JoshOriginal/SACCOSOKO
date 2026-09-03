import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OrderStatusBadge } from "@/components/orders/OrderStatusBadge";
import { useOrders } from "@/hooks/useOrders";
import { getDemoSeller } from "@/data/demoSeller";
import { products } from "@/data/products";
import { orderBelongsToSeller, getSellerItems, getSellerItemsTotal } from "@/lib/sellerOrders";
import { DollarSign, ShoppingCart, Clock, Truck, Package, ArrowRight, Inbox } from "lucide-react";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-KE", { style: "currency", currency: "KES", minimumFractionDigits: 0 }).format(price);

const SellerDashboard = () => {
  const seller = getDemoSeller();
  const { orders } = useOrders();

  const sellerOrders = orders
    .filter((o) => orderBelongsToSeller(o, seller.id))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const totalSales = sellerOrders.reduce((sum, o) => sum + getSellerItemsTotal(o, seller.id), 0);
  const totalOrders = sellerOrders.length;
  const pendingOrders = sellerOrders.filter((o) => o.status === "pending").length;
  const readyForSacco = sellerOrders.filter((o) => o.status === "ready_for_sacco").length;
  const productCount = products.filter((p) => p.sellerId === seller.id).length;

  const stats = [
    { icon: DollarSign, label: "Total Sales", value: formatPrice(totalSales) },
    { icon: ShoppingCart, label: "Total Orders", value: String(totalOrders) },
    { icon: Clock, label: "Pending Orders", value: String(pendingOrders) },
    { icon: Truck, label: "Ready for SACCO", value: String(readyForSacco) },
    { icon: Package, label: "Products", value: String(productCount) },
  ];

  const recentOrders = sellerOrders.slice(0, 6);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Welcome back, {seller.businessName}</h1>
        <p className="text-muted-foreground mt-1">Here's what's happening with your store today.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <div className="h-9 w-9 rounded-lg bg-brand-light-green flex items-center justify-center mb-3">
                <stat.icon className="h-4 w-4 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="text-lg sm:text-xl font-bold text-foreground mt-0.5 truncate">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>Recent Orders</CardTitle>
          <Link to="/seller/orders">
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
              <p className="text-sm text-muted-foreground mt-1">New orders placed for your products will show up here.</p>
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs text-muted-foreground border-b border-border">
                      <th className="py-2 pr-4 font-medium">Order #</th>
                      <th className="py-2 pr-4 font-medium">Customer</th>
                      <th className="py-2 pr-4 font-medium">Products</th>
                      <th className="py-2 pr-4 font-medium">Total</th>
                      <th className="py-2 pr-4 font-medium">SACCO / Route / Stage</th>
                      <th className="py-2 pr-4 font-medium">Status</th>
                      <th className="py-2 pr-2 font-medium text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => {
                      const items = getSellerItems(order, seller.id);
                      return (
                        <tr key={order.id} className="border-b border-border last:border-0 hover:bg-muted/40">
                          <td className="py-3 pr-4 font-medium text-foreground whitespace-nowrap">{order.id}</td>
                          <td className="py-3 pr-4 text-foreground whitespace-nowrap">{order.customerName}</td>
                          <td className="py-3 pr-4 text-muted-foreground max-w-[220px] truncate">
                            {items.map((i) => i.name).join(", ")}
                          </td>
                          <td className="py-3 pr-4 font-semibold text-foreground whitespace-nowrap">
                            {formatPrice(getSellerItemsTotal(order, seller.id))}
                          </td>
                          <td className="py-3 pr-4 text-muted-foreground whitespace-nowrap">
                            {order.saccoLabel ? (
                              <span>
                                {order.saccoLabel} · {order.routeLabel} · {order.stageLabel}
                              </span>
                            ) : (
                              "—"
                            )}
                          </td>
                          <td className="py-3 pr-4"><OrderStatusBadge status={order.status} /></td>
                          <td className="py-3 pr-2 text-right">
                            <Link to={`/seller/orders/${order.id}`}>
                              <Button variant="outline" size="sm">View</Button>
                            </Link>
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
                    to={`/seller/orders/${order.id}`}
                    className="block rounded-lg border border-border p-3 hover:border-primary/30 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-foreground text-sm">{order.id}</span>
                      <OrderStatusBadge status={order.status} />
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{order.customerName}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-muted-foreground truncate max-w-[60%]">
                        {getSellerItems(order, seller.id).map((i) => i.name).join(", ")}
                      </span>
                      <span className="text-sm font-semibold text-foreground">
                        {formatPrice(getSellerItemsTotal(order, seller.id))}
                      </span>
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

export default SellerDashboard;
