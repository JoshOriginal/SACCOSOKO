/**
 * DEMO / MOCK DATA — illustrative orders + a small status-timeline helper.
 * Orders placed through the demo Checkout page are generated client-side
 * (see src/pages/Checkout.tsx) and are NOT persisted to Supabase. This file
 * also seeds a couple of sample orders so the Track Order page has
 * something to look up on a fresh visit.
 */
import { Order, OrderStatus, OrderTimelineStep } from "@/types";

export const ORDER_STATUS_FLOW: { status: OrderStatus; label: string; description: string }[] = [
  { status: "pending", label: "Order Placed", description: "Your order has been confirmed" },
  { status: "processing", label: "Seller Preparing", description: "The seller is preparing your order" },
  { status: "picked-up", label: "Picked Up by SACCO-SOKO", description: "Package collected from the seller" },
  { status: "in-transit", label: "In Transit", description: "On the way to your stage" },
  { status: "at-stage", label: "At Destination Stage", description: "Ready for pickup" },
  { status: "delivered", label: "Delivered", description: "Package delivered successfully" },
];

/**
 * Builds a display timeline for an order given its current status.
 * Steps up to and including the current status are marked completed with a
 * fabricated (but consistent) timestamp; later steps are left pending.
 */
export function buildTimeline(currentStatus: OrderStatus, referenceDate: Date = new Date()): OrderTimelineStep[] {
  if (currentStatus === "cancelled") {
    return ORDER_STATUS_FLOW.map((step, index) => ({
      ...step,
      timestamp: index === 0 ? referenceDate.toLocaleString("en-KE", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }) : null,
      completed: index === 0,
    }));
  }

  const currentIndex = ORDER_STATUS_FLOW.findIndex((s) => s.status === currentStatus);
  return ORDER_STATUS_FLOW.map((step, index) => {
    const completed = currentIndex >= 0 && index <= currentIndex;
    const timestamp = completed
      ? new Date(referenceDate.getTime() + index * 45 * 60 * 1000).toLocaleString("en-KE", {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
        })
      : null;
    return { status: step.status, label: step.label, description: step.description, timestamp, completed };
  });
}

export const demoOrders: Order[] = [
  {
    id: "SKO-2026-018823",
    customerName: "Ann Njoroge",
    email: "ann.njoroge@example.com",
    phone: "+254 712 345 678",
    deliveryAddress: "Kikuyu Town, near the market",
    items: [
      { productId: 1, name: "Samsung Galaxy A54 5G - 128GB, 8GB RAM", image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=200&h=200&fit=crop", seller: "Tech Hub Kenya", quantity: 1, price: 45999 },
    ],
    subtotal: 45999,
    deliveryFee: 200,
    tax: 6900,
    total: 53099,
    paymentMethod: "mpesa",
    status: "in-transit",
    routeLabel: "Nairobi CBD → Kikuyu",
    stageLabel: "Kikuyu Stage",
    createdAt: "2026-08-30T09:00:00+03:00",
    timeline: buildTimeline("in-transit", new Date("2026-08-30T09:00:00+03:00")),
  },
  {
    id: "SKO-2026-021190",
    customerName: "Brian Kiplangat",
    email: "brian.kiplangat@example.com",
    phone: "+254 722 456 789",
    deliveryAddress: "Thika Road, opposite the stage",
    items: [
      { productId: 3, name: "Wireless Bluetooth Headphones", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop", seller: "Audio World", quantity: 1, price: 3999 },
      { productId: 7, name: "Portable Power Bank 20000mAh", image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=200&h=200&fit=crop", seller: "PowerUp", quantity: 2, price: 2999 },
    ],
    subtotal: 9997,
    deliveryFee: 200,
    tax: 1500,
    total: 11697,
    paymentMethod: "cod",
    status: "delivered",
    routeLabel: "Nairobi CBD → Thika",
    stageLabel: "Thika Stage",
    createdAt: "2026-08-20T08:30:00+03:00",
    timeline: buildTimeline("delivered", new Date("2026-08-20T08:30:00+03:00")),
  },
];

export function findOrder(query: string): Order | undefined {
  const normalized = query.trim().toUpperCase();
  if (!normalized) return undefined;
  return demoOrders.find((o) => o.id.toUpperCase() === normalized);
}
