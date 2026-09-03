import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from "@/contexts/CartContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  CreditCard,
  Smartphone,
  Truck,
  CheckCircle2,
  ArrowRight,
  Info,
  MapPin,
} from "lucide-react";
import { Order, OrderItem, PaymentMethod } from "@/types";
import { buildTimeline } from "@/data/orders";
import { useOrders } from "@/hooks/useOrders";
import { getSellerById } from "@/data/sellers";
import { getSaccoById } from "@/data/saccos";
import { getRoutesBySacco } from "@/data/routes";
import { getStagesByRoute } from "@/data/stages";

const DELIVERY_FEE = 200;
const TAX_RATE = 0.15;

interface DeliveryFormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipcode: string;
}

const emptyForm: DeliveryFormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  zipcode: "",
};

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { cartItems, isLoaded: cartLoaded, getCartTotal, clearCart } = useCart();
  const { addOrder } = useOrders();
  const [formData, setFormData] = useState<DeliveryFormState>(emptyForm);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("mpesa");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  // If the cart is empty (and we're not just showing a completed order's
  // confirmation screen), there's nothing to check out — send the customer
  // back to their cart instead of showing fake products. Wait for the cart
  // to finish reading from localStorage first: on a direct/hard navigation
  // to /checkout, CartContext hasn't loaded yet on the very first render,
  // so cartItems briefly reads as [] even when the cart isn't actually empty.
  useEffect(() => {
    if (cartLoaded && cartItems.length === 0 && !orderComplete) {
      navigate("/cart", { replace: true });
    }
  }, [cartLoaded, cartItems, orderComplete, navigate]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const subtotal = getCartTotal();
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + DELIVERY_FEE + tax;

  // There's no route/stage picker yet (a later phase) — for the demo, the
  // delivery is auto-assigned from the first item's seller's SACCO. Shown
  // to the customer here so checkout doesn't silently decide this, and
  // reused unchanged when the order is actually placed below.
  const deliveryAssignment = useMemo(() => {
    const primarySellerId = cartItems[0]?.sellerId;
    const primarySeller = primarySellerId ? getSellerById(primarySellerId) : undefined;
    const sacco = primarySeller?.saccoId ? getSaccoById(primarySeller.saccoId) : undefined;
    const route = sacco ? getRoutesBySacco(sacco.id)[0] : undefined;
    const stage = route ? getStagesByRoute(route.id).find((s) => s.id.endsWith("-dest")) : undefined;
    return { sacco, route, stage };
  }, [cartItems]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmitOrder = () => {
    const required: (keyof DeliveryFormState)[] = ["firstName", "lastName", "email", "phone", "address", "city"];
    const missing = required.some((field) => !formData[field].trim());
    if (missing) {
      toast({
        title: "Missing delivery details",
        description: "Please fill in all required fields before placing your order.",
      });
      return;
    }

    setIsProcessing(true);

    const orderItems: OrderItem[] = cartItems.map((item) => ({
      productId: item.id,
      name: item.name,
      image: item.image,
      seller: item.seller,
      sellerId: item.sellerId,
      quantity: item.quantity,
      price: item.price,
    }));

    const { sacco: assignedSacco, route: assignedRoute, stage: assignedStage } = deliveryAssignment;

    const orderId = `SKO-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const createdAt = new Date();

    const newOrder: Order = {
      id: orderId,
      customerName: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      phone: formData.phone,
      deliveryAddress: `${formData.address}, ${formData.city}${formData.zipcode ? ` ${formData.zipcode}` : ""}`,
      items: orderItems,
      subtotal,
      deliveryFee: DELIVERY_FEE,
      tax,
      total,
      paymentMethod,
      status: "pending",
      saccoId: assignedSacco?.id,
      saccoLabel: assignedSacco?.name,
      routeId: assignedRoute?.id,
      routeLabel: assignedRoute ? `${assignedRoute.from} → ${assignedRoute.to}` : undefined,
      stageId: assignedStage?.id,
      stageLabel: assignedStage?.name,
      createdAt: createdAt.toISOString(),
      timeline: buildTimeline("pending", createdAt),
    };

    // Simulated processing delay — this is a demo checkout. No payment
    // gateway is called. The order is written to the shared demo order
    // store (OrderContext), not to Supabase.
    setTimeout(() => {
      setIsProcessing(false);
      addOrder(newOrder);
      setPlacedOrder(newOrder);
      setOrderComplete(true);
      clearCart();
    }, 1500);
  };

  if (orderComplete && placedOrder) {
    return (
      <Layout>
        <div className="min-h-screen bg-muted/30 flex items-center justify-center py-12 px-4">
          <div className="w-full max-w-md">
            <div className="bg-card rounded-2xl border border-border shadow-xl p-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Order Confirmed!</h1>
              <p className="text-muted-foreground mb-6">
                Your order has been placed successfully.
              </p>
              <div className="space-y-3 mb-8 p-4 bg-muted rounded-lg">
                <div className="flex justify-between">
                  <span className="text-sm text-foreground">Order ID:</span>
                  <span className="text-sm font-semibold text-foreground">{placedOrder.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-foreground">Total Amount:</span>
                  <span className="text-sm font-semibold text-primary">{formatPrice(placedOrder.total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-foreground">Delivery Date:</span>
                  <span className="text-sm font-semibold text-foreground">2-3 business days</span>
                </div>
                {placedOrder.saccoLabel && (
                  <div className="flex justify-between">
                    <span className="text-sm text-foreground">Delivery via:</span>
                    <span className="text-sm font-semibold text-foreground text-right">{placedOrder.saccoLabel}</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground mb-6 text-left bg-brand-light-green rounded-lg p-3">
                What happens next: the seller prepares your order, hands it to{" "}
                {placedOrder.saccoLabel ?? "our delivery partner"}, and it travels{" "}
                {placedOrder.routeLabel ? `via ${placedOrder.routeLabel}` : "through the network"} to{" "}
                {placedOrder.stageLabel ?? "your pickup point"} for collection.
              </p>
              <div className="space-y-3">
                <Button
                  onClick={() => navigate("/track-order", { state: { order: placedOrder } })}
                  className="w-full"
                >
                  Track Your Order
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("/")}
                  className="w-full"
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (cartItems.length === 0) {
    // Brief window before the redirect effect above kicks in.
    return null;
  }

  return (
    <Layout>
      <div className="min-h-screen bg-muted/30 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-8">Checkout</h1>

          <div className="grid gap-8">
            {/* Main Content */}
            <div className="space-y-6">
              {/* Delivery Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Delivery Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" className="mt-2" value={formData.firstName} onChange={handleChange} required />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" className="mt-2" value={formData.lastName} onChange={handleChange} required />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="john@example.com" className="mt-2" value={formData.email} onChange={handleChange} required />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="+254 712 345 678" className="mt-2" value={formData.phone} onChange={handleChange} required />
                  </div>
                  <div>
                    <Label htmlFor="address">Delivery Address</Label>
                    <Input id="address" placeholder="Street address" className="mt-2" value={formData.address} onChange={handleChange} required />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="Nairobi" className="mt-2" value={formData.city} onChange={handleChange} required />
                    </div>
                    <div>
                      <Label htmlFor="zipcode">Postal Code</Label>
                      <Input id="zipcode" placeholder="00100" className="mt-2" value={formData.zipcode} onChange={handleChange} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Method — the SACCO/route/stage this order will move through */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Delivery Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {deliveryAssignment.sacco ? (
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-brand-light-blue">
                      <Truck className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium text-foreground">
                          Delivered via {deliveryAssignment.sacco.name}
                        </p>
                        <p className="text-muted-foreground mt-0.5">
                          Route: {deliveryAssignment.route ? `${deliveryAssignment.route.from} → ${deliveryAssignment.route.to}` : "Not yet assigned"}
                        </p>
                        <p className="text-muted-foreground">
                          Pickup at: {deliveryAssignment.stage?.name ?? "Not yet assigned"}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">Delivery network will be assigned once your order is placed.</p>
                  )}
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="mpesa" className="flex items-center gap-2">
                        <Smartphone className="h-4 w-4" />
                        <span className="hidden sm:inline">M-Pesa</span>
                      </TabsTrigger>
                      <TabsTrigger value="card" className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        <span className="hidden sm:inline">Card</span>
                      </TabsTrigger>
                      <TabsTrigger value="cod">Cash on Delivery</TabsTrigger>
                    </TabsList>

                    <TabsContent value="mpesa" className="space-y-4 mt-4">
                      <p className="text-sm text-muted-foreground">
                        You'll receive an M-Pesa prompt to complete the payment.
                      </p>
                      <div className="p-4 bg-muted rounded-lg">
                        <p className="text-sm font-semibold text-foreground">Amount to pay: {formatPrice(total)}</p>
                        <p className="text-xs text-muted-foreground mt-1">You'll be asked to enter your M-Pesa PIN</p>
                      </div>
                    </TabsContent>

                    <TabsContent value="card" className="space-y-4 mt-4">
                      <div>
                        <Label htmlFor="cardName">Cardholder Name</Label>
                        <Input id="cardName" placeholder="John Doe" className="mt-2" />
                      </div>
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input id="cardNumber" placeholder="4532 1234 5678 9010" className="mt-2" />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" className="mt-2" />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" className="mt-2" />
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="cod" className="space-y-4 mt-4">
                      <p className="text-sm text-muted-foreground">
                        Pay when your order is delivered to your address.
                      </p>
                      <div className="p-4 bg-muted rounded-lg">
                        <p className="text-sm font-semibold text-foreground">Total amount due on delivery: {formatPrice(total)}</p>
                      </div>
                    </TabsContent>
                  </Tabs>
                  <div className="flex items-start gap-2 mt-4 p-3 rounded-lg bg-brand-light-orange border border-brand-orange/20">
                    <Info className="h-4 w-4 text-brand-orange shrink-0 mt-0.5" />
                    <p className="text-xs text-muted-foreground">
                      Demo checkout — no real payment is processed and no charge will be made.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <Card className="h-fit sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary ({cartItems.length} {cartItems.length === 1 ? "item" : "items"})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-14 w-14 rounded-md object-cover shrink-0 bg-muted"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.seller}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-muted-foreground">
                          {formatPrice(item.price)} <Badge variant="outline" className="ml-1">{item.quantity}x</Badge>
                        </span>
                        <span className="text-sm font-semibold text-foreground">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery Fee (SACCO-SOKO)</span>
                    <span className="text-foreground">{formatPrice(DELIVERY_FEE)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (15%)</span>
                    <span className="text-foreground">{formatPrice(tax)}</span>
                  </div>
                  <div className="border-t border-border pt-2 flex justify-between">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="text-lg font-bold text-primary">{formatPrice(total)}</span>
                  </div>
                </div>

                <Button
                  onClick={handleSubmitOrder}
                  disabled={isProcessing}
                  className="w-full mt-6"
                  size="lg"
                >
                  {isProcessing ? "Processing..." : `Complete Purchase - ${formatPrice(total)}`}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
