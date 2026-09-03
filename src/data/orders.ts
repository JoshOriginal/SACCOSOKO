/**
 * DEMO / MOCK DATA — seed orders + the status-timeline helper.
 *
 * Orders placed through Checkout, and status changes made in the Seller
 * Portal, are NOT written to Supabase — they live in OrderContext
 * (src/contexts/OrderContext.tsx), which persists to localStorage so the
 * demo survives a refresh. This file only seeds the initial data: it's read
 * once by OrderContext on first load (or whenever localStorage is empty/reset).
 */
import { Order, OrderStatus, OrderTimelineStep } from "@/types";

export const ORDER_STATUS_FLOW: { status: OrderStatus; label: string; description: string }[] = [
  { status: "pending", label: "Order Placed", description: "Your order has been confirmed" },
  { status: "processing", label: "Seller Processing", description: "The seller is preparing your order" },
  { status: "ready_for_sacco", label: "Ready for SACCO Pickup", description: "Packed and waiting for SACCO-SOKO to collect" },
  { status: "picked-up", label: "Handed to SACCO-SOKO", description: "Package collected from the seller" },
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

// Seed orders. Five belong to the demo seller (Tech Hub Kenya) spanning
// every stage of the seller-facing lifecycle, plus one belonging to a
// different seller so seller-portal filtering can be demonstrated as real.
export const demoOrders: Order[] = [
  {
    id: "SKO-2026-018001",
    customerName: "Ann Njoroge",
    email: "ann.njoroge@example.com",
    phone: "+254 712 345 678",
    deliveryAddress: "Kikuyu Town, near the market",
    items: [
      { productId: 1, name: "Samsung Galaxy A54 5G - 128GB, 8GB RAM", image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=200&h=200&fit=crop", seller: "Tech Hub Kenya", sellerId: "tech-hub-kenya", quantity: 1, price: 45999 },
    ],
    subtotal: 45999,
    deliveryFee: 200,
    tax: 6900,
    total: 53099,
    paymentMethod: "mpesa",
    status: "pending",
    saccoId: "forward-trans",
    saccoLabel: "Forward Trans SACCO",
    routeId: "rt-kikuyu",
    routeLabel: "Nairobi CBD → Kikuyu",
    stageId: "st-rt-kikuyu-dest",
    stageLabel: "Kikuyu Stage",
    createdAt: "2026-09-02T08:15:00+03:00",
    timeline: buildTimeline("pending", new Date("2026-09-02T08:15:00+03:00")),
  },
  {
    id: "SKO-2026-017950",
    customerName: "Michael Wafula",
    email: "michael.wafula@example.com",
    phone: "+254 713 456 789",
    deliveryAddress: "Limuru Road, near the post office",
    items: [
      { productId: 13, name: "iPhone 13 - 128GB", image: "/placeholder.svg", seller: "Tech Hub Kenya", sellerId: "tech-hub-kenya", quantity: 1, price: 89999 },
    ],
    subtotal: 89999,
    deliveryFee: 200,
    tax: 13500,
    total: 103699,
    paymentMethod: "card",
    status: "processing",
    saccoId: "forward-trans",
    saccoLabel: "Forward Trans SACCO",
    routeId: "rt-limuru",
    routeLabel: "Nairobi CBD → Limuru",
    stageId: "st-rt-limuru-dest",
    stageLabel: "Limuru Stage",
    createdAt: "2026-09-01T10:00:00+03:00",
    timeline: buildTimeline("processing", new Date("2026-09-01T10:00:00+03:00")),
  },
  {
    id: "SKO-2026-017890",
    customerName: "Christine Wambui",
    email: "christine.wambui@example.com",
    phone: "+254 714 567 890",
    deliveryAddress: "Kikuyu Town, opposite the SACCO stage",
    items: [
      { productId: 14, name: 'HP Pavilion Laptop 15.6" - Core i5, 8GB RAM', image: "/placeholder.svg", seller: "Tech Hub Kenya", sellerId: "tech-hub-kenya", quantity: 1, price: 68999 },
      { productId: 15, name: "Samsung Galaxy Tab A9", image: "/placeholder.svg", seller: "Tech Hub Kenya", sellerId: "tech-hub-kenya", quantity: 1, price: 24999 },
    ],
    subtotal: 93998,
    deliveryFee: 200,
    tax: 14100,
    total: 108298,
    paymentMethod: "mpesa",
    status: "ready_for_sacco",
    saccoId: "forward-trans",
    saccoLabel: "Forward Trans SACCO",
    routeId: "rt-kikuyu",
    routeLabel: "Nairobi CBD → Kikuyu",
    stageId: "st-rt-kikuyu-dest",
    stageLabel: "Kikuyu Stage",
    createdAt: "2026-08-31T09:30:00+03:00",
    timeline: buildTimeline("ready_for_sacco", new Date("2026-08-31T09:30:00+03:00")),
  },
  {
    id: "SKO-2026-017820",
    customerName: "Brian Kiplangat",
    email: "brian.kiplangat@example.com",
    phone: "+254 722 456 789",
    deliveryAddress: "Limuru Town, near the market",
    items: [
      { productId: 1, name: "Samsung Galaxy A54 5G - 128GB, 8GB RAM", image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=200&h=200&fit=crop", seller: "Tech Hub Kenya", sellerId: "tech-hub-kenya", quantity: 1, price: 45999 },
    ],
    subtotal: 45999,
    deliveryFee: 200,
    tax: 6900,
    total: 53099,
    paymentMethod: "cod",
    status: "in-transit",
    saccoId: "forward-trans",
    saccoLabel: "Forward Trans SACCO",
    routeId: "rt-limuru",
    routeLabel: "Nairobi CBD → Limuru",
    stageId: "st-rt-limuru-dest",
    stageLabel: "Limuru Stage",
    createdAt: "2026-08-29T09:00:00+03:00",
    timeline: buildTimeline("in-transit", new Date("2026-08-29T09:00:00+03:00")),
  },
  {
    id: "SKO-2026-017700",
    customerName: "Faith Wanjiku",
    email: "faith.wanjiku@example.com",
    phone: "+254 715 678 901",
    deliveryAddress: "Kikuyu Town, near the stage",
    items: [
      { productId: 1, name: "Samsung Galaxy A54 5G - 128GB, 8GB RAM", image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=200&h=200&fit=crop", seller: "Tech Hub Kenya", sellerId: "tech-hub-kenya", quantity: 1, price: 45999 },
    ],
    subtotal: 45999,
    deliveryFee: 200,
    tax: 6900,
    total: 53099,
    paymentMethod: "mpesa",
    status: "delivered",
    saccoId: "forward-trans",
    saccoLabel: "Forward Trans SACCO",
    routeId: "rt-kikuyu",
    routeLabel: "Nairobi CBD → Kikuyu",
    stageId: "st-rt-kikuyu-dest",
    stageLabel: "Kikuyu Stage",
    createdAt: "2026-08-25T08:00:00+03:00",
    timeline: buildTimeline("delivered", new Date("2026-08-25T08:00:00+03:00")),
  },
  // Two more Forward Trans SACCO orders (Phase 4) so the SACCO Portal has a
  // real example of every stage of ITS OWN lifecycle — "picked-up" and
  // "at-stage" weren't otherwise represented in the seed data. These use
  // other sellers on the same SACCO (Time Gallery, PowerUp) to also show
  // that one SACCO serves multiple sellers, not just Tech Hub Kenya.
  {
    id: "SKO-2026-017600",
    customerName: "Grace Otieno",
    email: "grace.otieno@example.com",
    phone: "+254 716 789 012",
    deliveryAddress: "Kikuyu Town, near the stage",
    items: [
      { productId: 4, name: "Women's Elegant Watch", image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=200&h=200&fit=crop", seller: "Time Gallery", sellerId: "time-gallery", quantity: 1, price: 8999 },
    ],
    subtotal: 8999,
    deliveryFee: 200,
    tax: 1350,
    total: 10549,
    paymentMethod: "mpesa",
    status: "picked-up",
    saccoId: "forward-trans",
    saccoLabel: "Forward Trans SACCO",
    routeId: "rt-kikuyu",
    routeLabel: "Nairobi CBD → Kikuyu",
    stageId: "st-rt-kikuyu-dest",
    stageLabel: "Kikuyu Stage",
    createdAt: "2026-08-24T09:00:00+03:00",
    timeline: buildTimeline("picked-up", new Date("2026-08-24T09:00:00+03:00")),
  },
  {
    id: "SKO-2026-017500",
    customerName: "Samuel Kimani",
    email: "samuel.kimani@example.com",
    phone: "+254 717 890 123",
    deliveryAddress: "Limuru Town, near the post office",
    items: [
      { productId: 7, name: "Portable Power Bank 20000mAh", image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=200&h=200&fit=crop", seller: "PowerUp", sellerId: "powerup", quantity: 3, price: 2999 },
    ],
    subtotal: 8997,
    deliveryFee: 200,
    tax: 1350,
    total: 10547,
    paymentMethod: "cod",
    status: "at-stage",
    saccoId: "forward-trans",
    saccoLabel: "Forward Trans SACCO",
    routeId: "rt-limuru",
    routeLabel: "Nairobi CBD → Limuru",
    stageId: "st-rt-limuru-dest",
    stageLabel: "Limuru Stage",
    createdAt: "2026-08-23T09:00:00+03:00",
    timeline: buildTimeline("at-stage", new Date("2026-08-23T09:00:00+03:00")),
  },
  // Belongs to different sellers (Audio World / PowerUp) — proves the seller
  // portal correctly excludes orders that aren't Tech Hub Kenya's.
  {
    id: "SKO-2026-021190",
    customerName: "David Otieno",
    email: "david.otieno@example.com",
    phone: "+254 723 456 789",
    deliveryAddress: "Kitengela, opposite the stage",
    items: [
      { productId: 3, name: "Wireless Bluetooth Headphones", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop", seller: "Audio World", sellerId: "audio-world", quantity: 1, price: 3999 },
      { productId: 7, name: "Portable Power Bank 20000mAh", image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=200&h=200&fit=crop", seller: "PowerUp", sellerId: "powerup", quantity: 2, price: 2999 },
    ],
    subtotal: 9997,
    deliveryFee: 200,
    tax: 1500,
    total: 11697,
    paymentMethod: "cod",
    status: "delivered",
    saccoId: "citee-express",
    saccoLabel: "Citee Express SACCO",
    routeId: "rt-kitengela",
    routeLabel: "Nairobi CBD → Kitengela",
    stageId: "st-rt-kitengela-dest",
    stageLabel: "Kitengela Stage",
    createdAt: "2026-08-20T08:30:00+03:00",
    timeline: buildTimeline("delivered", new Date("2026-08-20T08:30:00+03:00")),
  },
];
