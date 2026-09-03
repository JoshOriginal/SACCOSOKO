import { Order, OrderItem, OrderStatus } from "@/types";

/** The line items within an order that belong to a specific seller. */
export function getSellerItems(order: Order, sellerId: string): OrderItem[] {
  return order.items.filter((item) => item.sellerId === sellerId);
}

/** Sum of that seller's own items in the order (excludes delivery fee/tax, which belong to the whole order). */
export function getSellerItemsTotal(order: Order, sellerId: string): number {
  return getSellerItems(order, sellerId).reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function orderBelongsToSeller(order: Order, sellerId: string): boolean {
  return order.items.some((item) => item.sellerId === sellerId);
}

export type SellerOrderFilter = "all" | "new" | "processing" | "ready_for_sacco" | "handed_to_sacco" | "delivered";

export const SELLER_ORDER_FILTERS: { value: SellerOrderFilter; label: string }[] = [
  { value: "all", label: "All Orders" },
  { value: "new", label: "New" },
  { value: "processing", label: "Processing" },
  { value: "ready_for_sacco", label: "Ready for SACCO" },
  { value: "handed_to_sacco", label: "Handed to SACCO" },
  { value: "delivered", label: "Delivered" },
];

export interface SellerOrderAction {
  label: string;
  nextStatus: OrderStatus;
}

/**
 * The single source of truth for what the seller is allowed to do next.
 * Sellers may only push an order through: pending -> processing ->
 * ready_for_sacco -> picked-up (handed to SACCO). Everything after that
 * (in-transit, at-stage, delivered) is SACCO-operations-only — this
 * function returns null for those statuses, so no seller action button can
 * ever be rendered for them.
 */
export function getSellerNextAction(status: OrderStatus): SellerOrderAction | null {
  switch (status) {
    case "pending":
      return { label: "Start Preparing", nextStatus: "processing" };
    case "processing":
      return { label: "Mark Ready for SACCO", nextStatus: "ready_for_sacco" };
    case "ready_for_sacco":
      return { label: "Confirm Handover to SACCO", nextStatus: "picked-up" };
    default:
      return null;
  }
}

export function matchesSellerFilter(status: OrderStatus, filter: SellerOrderFilter): boolean {
  switch (filter) {
    case "all":
      return true;
    case "new":
      return status === "pending";
    case "processing":
      return status === "processing";
    case "ready_for_sacco":
      return status === "ready_for_sacco";
    case "handed_to_sacco":
      return status === "picked-up" || status === "in-transit" || status === "at-stage";
    case "delivered":
      return status === "delivered";
    default:
      return true;
  }
}
