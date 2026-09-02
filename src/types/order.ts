export type OrderStatus =
  | "pending"
  | "processing"
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
  /** Display-only SACCO route/stage labels. Route/stage selection at checkout is a later phase. */
  routeLabel?: string;
  stageLabel?: string;
  createdAt: string;
  timeline: OrderTimelineStep[];
}
