/**
 * DEMO / MOCK DATA — illustrative customers.
 * Not yet wired into the Admin > Customers screen (that page still keeps its
 * own local sample data); this file exists as the shared shape/source for
 * when that migration happens.
 */
import { Customer } from "@/types";

export const customers: Customer[] = [
  { id: "cus-001", name: "John Mwangi", email: "john.mwangi@example.com", phone: "+254 700 123 456", location: "Nairobi", registeredAt: "2025-02-14", totalOrders: 5, totalSpent: 45000, status: "active" },
  { id: "cus-002", name: "Sarah Kipchoge", email: "sarah.kipchoge@example.com", phone: "+254 701 234 567", location: "Mombasa", registeredAt: "2025-04-02", totalOrders: 3, totalSpent: 28500, status: "active" },
  { id: "cus-003", name: "David Omondi", email: "david.omondi@example.com", phone: "+254 702 345 678", location: "Kisumu", registeredAt: "2025-01-20", totalOrders: 8, totalSpent: 89200, status: "active" },
  { id: "cus-004", name: "Grace Kariuki", email: "grace.kariuki@example.com", phone: "+254 703 456 789", location: "Nairobi", registeredAt: "2025-06-11", totalOrders: 2, totalSpent: 12300, status: "inactive" },
  { id: "cus-005", name: "Peter Langat", email: "peter.langat@example.com", phone: "+254 704 567 890", location: "Eldoret", registeredAt: "2024-11-30", totalOrders: 12, totalSpent: 156700, status: "active" },
];

export function getCustomerById(id?: string): Customer | undefined {
  return customers.find((c) => c.id === id);
}
