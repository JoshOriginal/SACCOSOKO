/**
 * DEMO / MOCK DATA — for the SACCO-SOKO prototype only.
 * This is not production data and is not read from or written to a database.
 * SACCO-SOKO is designed to onboard many different SACCOs; these three are
 * illustrative examples used to demo the seller -> SACCO -> route -> stage flow.
 */
import { Sacco } from "@/types";

export const saccos: Sacco[] = [
  {
    id: "forward-trans",
    name: "Forward Trans SACCO",
    region: "Nairobi CBD – Western Corridor",
    description: "Serves Nairobi's western routes with a fleet of over 120 vehicles.",
    contactPhone: "+254 700 111 222",
  },
  {
    id: "cbd-shuttle",
    name: "CBD Shuttle SACCO",
    region: "Nairobi CBD – Eastern Corridor",
    description: "Connects Nairobi CBD to the eastern satellite towns.",
    contactPhone: "+254 700 333 444",
  },
  {
    id: "citee-express",
    name: "Citee Express SACCO",
    region: "Nairobi CBD – Southern Corridor",
    description: "Reliable daily service on the southern Nairobi routes.",
    contactPhone: "+254 700 555 666",
  },
];

export function getSaccoById(id?: string): Sacco | undefined {
  return saccos.find((s) => s.id === id);
}
