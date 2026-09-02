/**
 * DEMO / MOCK DATA — illustrative SACCO routes, not a live schedule.
 */
import { SaccoRoute } from "@/types";

export const routes: SaccoRoute[] = [
  { id: "rt-kikuyu", saccoId: "forward-trans", from: "Nairobi CBD", to: "Kikuyu", estimatedTime: "45 mins", price: 150 },
  { id: "rt-limuru", saccoId: "forward-trans", from: "Nairobi CBD", to: "Limuru", estimatedTime: "55 mins", price: 170 },
  { id: "rt-thika", saccoId: "cbd-shuttle", from: "Nairobi CBD", to: "Thika", estimatedTime: "1 hour", price: 200 },
  { id: "rt-juja", saccoId: "cbd-shuttle", from: "Nairobi CBD", to: "Juja", estimatedTime: "35 mins", price: 100 },
  { id: "rt-kitengela", saccoId: "citee-express", from: "Nairobi CBD", to: "Kitengela", estimatedTime: "50 mins", price: 180 },
  { id: "rt-rongai", saccoId: "citee-express", from: "Nairobi CBD", to: "Rongai", estimatedTime: "40 mins", price: 120 },
];

export function getRouteById(id?: string): SaccoRoute | undefined {
  return routes.find((r) => r.id === id);
}

export function getRoutesBySacco(saccoId: string): SaccoRoute[] {
  return routes.filter((r) => r.saccoId === saccoId);
}
