export type OrderStatus =
  | "pending"
  | "processing"
  | "ready_for_sacco"
  | "picked-up"
  | "in-transit"
  | "at-stage"
  | "delivered"
  | "cancelled";

export type PaymentMethod = "mpesa" | "card" | "cod";

export interface OrderItem {
  productId: number;
  name: string;
  image: string;
  seller: string;
  /** Links this line item back to the owning seller. Optional for backward compatibility. */
  sellerId?: string;
  quantity: number;
  price: number;
}

export interface OrderTimelineStep {
  status: OrderStatus;
  label: string;
  description: string;
  /** Pre-formatted display timestamp, or null if this step hasn't happened yet. */
  timestamp: string | null;
  completed: boolean;
}

export interface Order {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  deliveryAddress: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  /**
   * SACCO/route/(destination) stage assignment. Auto-assigned for the demo
   * (from the seller's SACCO) rather than chosen by the customer — a real
   * route/stage picker in checkout is a later phase. The `*Label` fields are
   * pre-resolved display strings; the `*Id` fields link back to
   * src/data/saccos.ts, routes.ts and stages.ts for the SACCO Portal
   * (Phase 4), which needs to filter/aggregate by id, not by name string.
   */
  saccoId?: string;
  saccoLabel?: string;
  routeId?: string;
  routeLabel?: string;
  stageId?: string;
  stageLabel?: string;
  createdAt: string;
  timeline: OrderTimelineStep[];
}
