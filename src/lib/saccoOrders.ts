import { Order, OrderStatus } from "@/types";

/**
 * Statuses the SACCO Portal ever needs to see. Orders still with the seller
 * (pending, processing) are deliberately excluded everywhere in this file —
 * they aren't the SACCO's concern yet, even though saccoId is assigned
 * early (an implementation detail of the demo checkout auto-assignment).
 */
const SACCO_RELEVANT_STATUSES: OrderStatus[] = ["ready_for_sacco", "picked-up", "in-transit", "at-stage", "delivered"];

export function isSaccoRelevant(status: OrderStatus): boolean {
  return SACCO_RELEVANT_STATUSES.includes(status);
}

export function orderBelongsToSacco(order: Order, saccoId: string): boolean {
  return order.saccoId === saccoId;
}

/** Orders this SACCO's dashboard should ever list — its own, and past the seller-only stages. */
export function getSaccoOrders(orders: Order[], saccoId: string): Order[] {
  return orders.filter((o) => orderBelongsToSacco(o, saccoId) && isSaccoRelevant(o.status));
}

export type SaccoOrderFilter = "all" | "awaiting_sacco" | "picked_up" | "in_transit" | "at_stage" | "delivered";

export const SACCO_ORDER_FILTERS: { value: SaccoOrderFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "awaiting_sacco", label: "Awaiting SACCO" },
  { value: "picked_up", label: "Picked Up" },
  { value: "in_transit", label: "In Transit" },
  { value: "at_stage", label: "At Stage" },
  { value: "delivered", label: "Delivered" },
];

export function matchesSaccoFilter(status: OrderStatus, filter: SaccoOrderFilter): boolean {
  switch (filter) {
    case "all":
      return true;
    case "awaiting_sacco":
      return status === "ready_for_sacco";
    case "picked_up":
      return status === "picked-up";
    case "in_transit":
      return status === "in-transit";
    case "at_stage":
      return status === "at-stage";
    case "delivered":
      return status === "delivered";
    default:
      return true;
  }
}

export interface SaccoOrderAction {
  label: string;
  nextStatus: OrderStatus;
}

/**
 * The single source of truth for what SACCO operations may do next. SACCO
 * may only advance: ready_for_sacco -> picked-up -> in-transit -> at-stage
 * -> delivered. Every other status (including the seller-only pending and
 * processing) returns null here, so a SACCO action button can never be
 * rendered for a seller-owned stage — this is what structurally prevents
 * the SACCO UI from ever offering "Start Preparing" or "Mark Ready for
 * SACCO", which belong only to src/lib/sellerOrders.ts.
 */
export function getSaccoNextAction(status: OrderStatus): SaccoOrderAction | null {
  switch (status) {
    case "ready_for_sacco":
      return { label: "Receive / Pick Up Order", nextStatus: "picked-up" };
    case "picked-up":
      return { label: "Dispatch on Route", nextStatus: "in-transit" };
    case "in-transit":
      return { label: "Mark Arrived at Stage", nextStatus: "at-stage" };
    case "at-stage":
      return { label: "Mark Delivered", nextStatus: "delivered" };
    default:
      return null;
  }
}

export function isToday(isoDate: string): boolean {
  const d = new Date(isoDate);
  const now = new Date();
  return d.toDateString() === now.toDateString();
}
