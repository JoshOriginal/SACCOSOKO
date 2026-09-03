import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from "@/contexts/CartContext";
import { getProductById, getRelatedProducts } from "@/data/products";
import { getSellerById } from "@/data/sellers";
import {
  Star,
  Heart,
  ShoppingCart,
  Minus,
  Plus,
  Truck,
  Shield,
  MapPin,
  Store,
  ChevronRight,
  PackageSearch,
} from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const product = getProductById(id ?? "");
  const seller = getSellerById(product?.sellerId);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Product not found (bad/unknown id in the URL) — show a graceful empty
  // state instead of crashing or silently displaying the wrong product.
  if (!product) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <div className="max-w-md mx-auto">
            <div className="h-24 w-24 mx-auto rounded-full bg-muted flex items-center justify-center mb-6">
              <PackageSearch className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Product not found</h1>
            <p className="text-muted-foreground mb-6">
              We couldn't find a product with that ID. It may have been removed or the link is incorrect.
            </p>
            <Link to="/shop">
              <Button variant="hero" size="lg">Back to Shop</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const relatedProducts = getRelatedProducts(product);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      seller: seller?.businessName ?? "SACCO-SOKO Seller",
      sellerId: product.sellerId,
      quantity: quantity,
    });
    toast({
      title: "Added to Cart!",
      description: `${quantity} × ${product.name} has been added to your cart.`,
    });
  };

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <Layout>
      <div className="bg-muted/30 min-h-screen">
        <div className="container py-6 lg:py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 flex-wrap">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link to="/shop" className="hover:text-primary">Shop</Link>
            <ChevronRight className="h-4 w-4" />
            <Link to={`/shop?category=${product.category.toLowerCase()}`} className="hover:text-primary capitalize">
              {product.category}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground truncate max-w-[200px]">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Images */}
            <div className="space-y-4">
              <div className="relative aspect-square bg-card rounded-2xl border border-border overflow-hidden">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
                <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground font-bold">
                  -{discount}% OFF
                </Badge>
                <button className="absolute top-4 right-4 h-10 w-10 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Heart className="h-5 w-5" />
                </button>
              </div>

              {product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      className={`w-20 h-20 rounded-xl border-2 overflow-hidden transition-all ${
                        selectedImage === index
                          ? "border-primary"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <img src={image} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="space-y-6">
              {/* Seller */}
              {seller && (
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Store className="h-4 w-4" />
                  {seller.businessName}
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-primary text-primary" />
                    {seller.rating}
                  </span>
                </Link>
              )}

              <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? "fill-primary text-primary"
                          : "text-muted"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-medium">{product.rating}</span>
                <span className="text-muted-foreground">({product.reviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-3xl font-bold text-primary">{formatPrice(product.price)}</span>
                <span className="text-xl text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
                <Badge variant="secondary" className="bg-brand-light-green text-accent-foreground">
                  Save {formatPrice(product.originalPrice - product.price)}
                </Badge>
              </div>

              {/* Stock */}
              <p className="text-sm">
                <span className="text-muted-foreground">Availability: </span>
                <span className="text-green-600 font-medium">{product.stock} in stock</span>
              </p>

              {/* Quantity & Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center gap-3 bg-muted rounded-lg p-1 w-fit">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <Button variant="hero" size="lg" className="flex-1 gap-2" onClick={handleAddToCart}>
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart - {formatPrice(product.price * quantity)}
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-border">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-brand-light-blue flex items-center justify-center">
                    <Truck className="h-5 w-5 text-secondary" />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">SACCO-SOKO</p>
                    <p className="text-muted-foreground">Fast delivery</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-brand-light-green flex items-center justify-center">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Buyer Protection</p>
                    <p className="text-muted-foreground">Guaranteed</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-foreground" />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">Stage Pickup</p>
                    <p className="text-muted-foreground">Available</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="pt-6 border-t border-border">
                <h3 className="font-semibold text-lg mb-3">Description</h3>
                <div className="text-muted-foreground whitespace-pre-line text-sm leading-relaxed">
                  {product.description}
                </div>
              </div>

              {/* Specifications */}
              {product.specs && product.specs.length > 0 && (
                <div className="pt-6 border-t border-border">
                  <h3 className="font-semibold text-lg mb-3">Specifications</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {product.specs.map((spec, index) => (
                      <div key={index} className="flex justify-between py-2 border-b border-border text-sm">
                        <span className="text-muted-foreground">{spec.label}</span>
                        <span className="font-medium text-foreground">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-12 pt-8 border-t border-border">
              <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-6">Related Products</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                {relatedProducts.map((related) => (
                  <button
                    key={related.id}
                    onClick={() => navigate(`/product/${related.id}`)}
                    className="group text-left bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="aspect-square overflow-hidden bg-muted">
                      <img
                        src={related.images[0]}
                        alt={related.name}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-semibold text-sm text-foreground line-clamp-2 group-hover:text-primary transition-colors min-h-[2.5rem]">
                        {related.name}
                      </h3>
                      <span className="text-base font-bold text-primary">{formatPrice(related.price)}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
