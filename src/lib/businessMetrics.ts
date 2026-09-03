import { Order } from "@/types";
import { sellers } from "@/data/sellers";
import { routes } from "@/data/routes";
import { stages } from "@/data/stages";

/**
 * Platform-wide business metrics for the SACCO Business Value page — all
 * computed from the same shared demo data everything else uses (OrderContext
 * + the static seller/route/stage catalogs). Nothing here is a hardcoded
 * number; if the underlying seed data or live-placed demo orders change,
 * these change with them.
 */
const ACTIVE_STATUSES = ["ready_for_sacco", "picked-up", "in-transit", "at-stage"] as const;

export interface BusinessMetrics {
  totalOrders: number;
  totalOrderValue: number;
  deliveryRevenue: number;
  averageOrderValue: number;
  deliveredOrders: number;
  activeDeliveries: number;
  sellerCount: number;
  routeCount: number;
  stageCount: number;
}

export function computeBusinessMetrics(orders: Order[]): BusinessMetrics {
  const totalOrders = orders.length;
  const totalOrderValue = orders.reduce((sum, o) => sum + o.subtotal, 0);
  const deliveryRevenue = orders.reduce((sum, o) => sum + o.deliveryFee, 0);
  const averageOrderValue = totalOrders > 0 ? Math.round(totalOrderValue / totalOrders) : 0;
  const deliveredOrders = orders.filter((o) => o.status === "delivered").length;
  const activeDeliveries = orders.filter((o) => ACTIVE_STATUSES.includes(o.status as (typeof ACTIVE_STATUSES)[number])).length;

  return {
    totalOrders,
    totalOrderValue,
    deliveryRevenue,
    averageOrderValue,
    deliveredOrders,
    activeDeliveries,
    sellerCount: sellers.length,
    routeCount: routes.length,
    stageCount: stages.length,
  };
}
