import { useContext } from "react";
import { OrderContext } from "@/contexts/orderContextType";

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrders must be used within OrderProvider");
  }
  return context;
};
