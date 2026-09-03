export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  seller: string;
  /** Links this cart line back to the owning seller (used to attribute orders in the seller portal). */
  sellerId?: string;
  quantity: number;
}
