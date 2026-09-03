import React from "react";
import { Order, OrderStatus } from "@/types";

export interface OrderContextType {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  getOrderById: (orderId: string) => Order | undefined;
}

export const OrderContext = React.createContext<OrderContextType | undefined>(undefined);
