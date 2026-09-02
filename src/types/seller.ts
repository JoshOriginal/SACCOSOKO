export interface Seller {
  id: string;
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  location: string;
  /** SACCO this seller currently ships through most often. */
  saccoId?: string;
  rating: number;
  productsCount: number;
  joinedYear: string;
  verified: boolean;
}
