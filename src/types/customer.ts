export type CustomerStatus = "active" | "inactive";

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  registeredAt: string;
  totalOrders: number;
  totalSpent: number;
  status: CustomerStatus;
}
