/**
 * DEMO SACCO SESSION — NOT real authentication.
 *
 * Same rationale as src/data/demoSeller.ts: there is no real SACCO login
 * system yet, so the SACCO Operations Dashboard (Phase 4) runs as a single,
 * clearly-labelled demo SACCO rather than faking a production auth check.
 *
 * Uses "Forward Trans SACCO" (src/data/saccos.ts) — the SACCO most of the
 * seeded demo orders already route through, since it also serves the
 * Kikuyu/Limuru corridor referenced throughout the app's marketing copy.
 */
import { getSaccoById } from "./saccos";

export const DEMO_SACCO_ID = "forward-trans";

export function getDemoSacco() {
  const sacco = getSaccoById(DEMO_SACCO_ID);
  if (!sacco) {
    throw new Error(`Demo SACCO "${DEMO_SACCO_ID}" is missing from src/data/saccos.ts`);
  }
  return sacco;
}
