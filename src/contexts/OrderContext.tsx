import React, { useEffect, useState, ReactNode } from "react";
import { OrderContext } from "./orderContextType";
import { Order, OrderStatus } from "@/types";
import { demoOrders, buildTimeline } from "@/data/orders";

const STORAGE_KEY = "SACCO-SOKO-orders";

/**
 * Shared demo order store — the single source of truth for orders across
 * Checkout, the Seller Portal and the customer Track Order page.
 *
 * This is a local/demo data layer only: orders live in memory and in
 * localStorage, not in Supabase. Persisting to localStorage (rather than
 * keeping this in memory only) means the demo survives a page refresh and
 * lets the Seller Portal and Track Order page — different routes in the same
 * SPA — see the same live data.
 */
export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setOrders(Array.isArray(parsed) && parsed.length > 0 ? parsed : demoOrders);
      } else {
        setOrders(demoOrders);
      }
    } catch (error) {
      console.error("Failed to load orders from localStorage:", error);
      setOrders(demoOrders);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
      } catch (error) {
        console.error("Failed to save orders to localStorage:", error);
      }
    }
  }, [orders, isLoaded]);

  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? { ...order, status, timeline: buildTimeline(status, new Date(order.createdAt)) }
          : order
      )
    );
  };

  const getOrderById = (orderId: string) => {
    const normalized = orderId.trim().toUpperCase();
    if (!normalized) return undefined;
    return orders.find((order) => order.id.toUpperCase() === normalized);
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, updateOrderStatus, getOrderById }}>
      {children}
    </OrderContext.Provider>
  );
};
