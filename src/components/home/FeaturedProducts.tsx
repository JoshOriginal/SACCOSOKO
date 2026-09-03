import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from "@/contexts/CartContext";
import { Heart, ShoppingCart, Star, ChevronRight } from "lucide-react";
import { getFeaturedProducts } from "@/data/products";
import { getSellerById } from "@/data/sellers";

const products = getFeaturedProducts().map((p) => ({
  id: p.id,
  name: p.name,
  price: p.price,
  originalPrice: p.originalPrice,
  image: p.images[0],
  seller: getSellerById(p.sellerId)?.businessName ?? "SACCO-SOKO Seller",
  sellerId: p.sellerId,
  rating: p.rating,
  reviews: p.reviews,
  badge: p.badge ?? null,
}));

const FeaturedProducts = () => {
  const { toast } = useToast();
  const { addToCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getDiscount = (original: number, current: number) => {
    return Math.round(((original - current) / original) * 100);
  };

  const handleAddToCart = (product: (typeof products)[number]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      seller: product.seller,
      sellerId: product.sellerId,
      quantity: 1,
    });
    toast({
      title: "Added to Cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <section className="py-12 lg:py-16 bg-muted/30">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Featured Products</h2>
            <p className="text-muted-foreground mt-1">Handpicked deals just for you</p>
          </div>
          <Link 
            to="/shop" 
            className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            View All
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group relative bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-muted">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Badges */}
                {product.badge && (
                  <Badge variant="accent" className="absolute top-3 left-3 font-semibold">
                    {product.badge}
                  </Badge>
                )}
                
                {/* Discount badge */}
                <Badge 
                  variant="secondary" 
                  className="absolute top-3 right-3 bg-destructive text-destructive-foreground font-bold"
                >
                  -{getDiscount(product.originalPrice, product.price)}%
                </Badge>

                {/* Wishlist button */}
                <button className="absolute bottom-3 right-3 h-9 w-9 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary hover:text-primary-foreground">
                  <Heart className="h-4 w-4" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                <p className="text-xs text-muted-foreground mb-1">{product.seller}</p>
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-semibold text-sm text-foreground line-clamp-2 hover:text-primary transition-colors min-h-[2.5rem]">
                    {product.name}
                  </h3>
                </Link>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-2">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="text-sm font-medium text-foreground">{product.rating}</span>
                  <span className="text-xs text-muted-foreground">({product.reviews})</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-lg font-bold text-primary">{formatPrice(product.price)}</span>
                  <span className="text-sm text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
                </div>

                {/* Add to cart */}
                <Button 
                  variant="add-to-cart" 
                  size="sm" 
                  className="w-full mt-3 gap-2"
                  onClick={() => handleAddToCart(product)}
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Link 
          to="/shop" 
          className="flex sm:hidden items-center justify-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors mt-8"
        >
          View All Products
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
};

export default FeaturedProducts;
