/**
 * DEMO SELLER SESSION — NOT real authentication.
 *
 * The seller portal (Phase 3) has no real seller login yet: SellerRegister.tsx
 * doesn't create a Supabase session, and there is no seller/user table to
 * check a real identity against. Rather than bolt the existing Supabase
 * *admin* auth onto sellers (which would misrepresent how sellers actually
 * sign in), the portal runs as a single, clearly-labelled demo seller.
 *
 * Swap this out for real seller authentication in a later phase.
 */
import { getSellerById } from "./sellers";

export const DEMO_SELLER_ID = "tech-hub-kenya";

export function getDemoSeller() {
  const seller = getSellerById(DEMO_SELLER_ID);
  if (!seller) {
    throw new Error(`Demo seller "${DEMO_SELLER_ID}" is missing from src/data/sellers.ts`);
  }
  return seller;
}
