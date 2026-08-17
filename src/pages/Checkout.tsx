import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
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
} from "lucide-react";

const Checkout = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const cartItems = [
    { id: 1, name: "Samsung Galaxy A54 5G", price: 45999, quantity: 1 },
    { id: 2, name: "Nike Air Max 270 Sneakers", price: 12500, quantity: 2 },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 250;
  const tax = Math.round(subtotal * 0.15);
  const total = subtotal + deliveryFee + tax;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
    }, 2000);
  };

  if (orderComplete) {
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
                Your order has been placed successfully. You'll receive a confirmation email shortly.
              </p>
              <div className="space-y-3 mb-8 p-4 bg-muted rounded-lg">
                <div className="flex justify-between">
                  <span className="text-sm text-foreground">Order ID:</span>
                  <span className="text-sm font-semibold text-foreground">#SMK-2024-789456</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-foreground">Total Amount:</span>
                  <span className="text-sm font-semibold text-primary">{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-foreground">Delivery Date:</span>
                  <span className="text-sm font-semibold text-foreground">2-3 business days</span>
                </div>
              </div>
              <div className="space-y-3">
                <Button
                  onClick={() => navigate("/track-order")}
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
                      <Input id="firstName" placeholder="John" className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" className="mt-2" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="john@example.com" className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="+254 712 345 678" className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="address">Delivery Address</Label>
                    <Input id="address" placeholder="Street address" className="mt-2" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="Nairobi" className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="zipcode">Postal Code</Label>
                      <Input id="zipcode" placeholder="00100" className="mt-2" />
                    </div>
                  </div>
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
                  <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
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
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <Card className="h-fit sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.name} <Badge variant="outline" className="ml-2">{item.quantity}x</Badge>
                    </span>
                    <span className="font-semibold text-foreground">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}

                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery Fee</span>
                    <span className="text-foreground">{formatPrice(deliveryFee)}</span>
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
