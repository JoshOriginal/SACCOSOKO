export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: number;
  name: string;
  /** Category id — matches the filter ids used on the Shop page (electronics, fashion, sports, baby, beauty, ...). */
  category: string;
  price: number;
  originalPrice: number;
  /** Gallery images. Most demo products only have one curated image. */
  images: string[];
  sellerId: string;
  rating: number;
  reviews: number;
  stock: number;
  badge?: string | null;
  /** Shown in the "Featured Products" home section when true. */
  featured?: boolean;
  description: string;
  specs?: ProductSpec[];
}
