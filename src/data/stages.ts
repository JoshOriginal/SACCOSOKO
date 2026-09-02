/**
 * DEMO / MOCK DATA — illustrative pickup/drop-off stages along each route.
 */
import { Stage } from "@/types";

export const stages: Stage[] = [
  { id: "st-rt-kikuyu-origin", routeId: "rt-kikuyu", name: "Nairobi CBD Terminus", location: "Nairobi CBD" },
  { id: "st-rt-kikuyu-dest", routeId: "rt-kikuyu", name: "Kikuyu Stage", location: "Kikuyu" },

  { id: "st-rt-limuru-origin", routeId: "rt-limuru", name: "Nairobi CBD Terminus", location: "Nairobi CBD" },
  { id: "st-rt-limuru-dest", routeId: "rt-limuru", name: "Limuru Stage", location: "Limuru" },

  { id: "st-rt-thika-origin", routeId: "rt-thika", name: "Nairobi CBD Terminus", location: "Nairobi CBD" },
  { id: "st-rt-thika-dest", routeId: "rt-thika", name: "Thika Stage", location: "Thika" },

  { id: "st-rt-juja-origin", routeId: "rt-juja", name: "Nairobi CBD Terminus", location: "Nairobi CBD" },
  { id: "st-rt-juja-dest", routeId: "rt-juja", name: "Juja Stage", location: "Juja" },

  { id: "st-rt-kitengela-origin", routeId: "rt-kitengela", name: "Nairobi CBD Terminus", location: "Nairobi CBD" },
  { id: "st-rt-kitengela-dest", routeId: "rt-kitengela", name: "Kitengela Stage", location: "Kitengela" },

  { id: "st-rt-rongai-origin", routeId: "rt-rongai", name: "Nairobi CBD Terminus", location: "Nairobi CBD" },
  { id: "st-rt-rongai-dest", routeId: "rt-rongai", name: "Rongai Stage", location: "Rongai" },
];

export function getStagesByRoute(routeId: string): Stage[] {
  return stages.filter((s) => s.routeId === routeId);
}
