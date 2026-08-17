import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from "@/contexts/CartContext";
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
  ChevronRight
} from "lucide-react";

const product = {
  id: 1,
  name: "Samsung Galaxy A54 5G - 128GB, 8GB RAM",
  price: 45999,
  originalPrice: 52999,
  images: [
    "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=600&h=600&fit=crop",
  ],
  seller: {
    name: "Tech Hub Kenya",
    rating: 4.8,
    products: 156,
    joined: "2022",
  },
  rating: 4.8,
  reviews: 124,
  stock: 15,
  description: `The Samsung Galaxy A54 5G delivers a premium smartphone experience with its stunning 6.4" Super AMOLED display, powerful Exynos 1380 processor, and versatile camera system.

Key Features:
• 6.4" Super AMOLED Display with 120Hz refresh rate
• Triple camera system: 50MP main + 12MP ultra-wide + 5MP macro
• 32MP front camera for stunning selfies
• 5000mAh battery with 25W fast charging
• IP67 water and dust resistance
• 5G connectivity for blazing-fast speeds`,
  specs: [
    { label: "Display", value: '6.4" Super AMOLED, 120Hz' },
    { label: "Processor", value: "Exynos 1380 Octa-core" },
    { label: "RAM", value: "8GB" },
    { label: "Storage", value: "128GB" },
    { label: "Battery", value: "5000mAh" },
    { label: "Camera", value: "50MP + 12MP + 5MP" },
  ],
  category: "Electronics",
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      seller: product.seller.name,
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
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link to="/shop" className="hover:text-primary">Shop</Link>
            <ChevronRight className="h-4 w-4" />
            <Link to={`/shop?category=${product.category.toLowerCase()}`} className="hover:text-primary">
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
            </div>

            {/* Details */}
            <div className="space-y-6">
              {/* Seller */}
              <Link 
                to={`/seller/${product.seller.name}`}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Store className="h-4 w-4" />
                {product.seller.name}
                <span className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-primary text-primary" />
                  {product.seller.rating}
                </span>
              </Link>

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
              <div className="flex items-baseline gap-3">
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
                <div className="flex items-center gap-3 bg-muted rounded-lg p-1">
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
              <div className="pt-6 border-t border-border">
                <h3 className="font-semibold text-lg mb-3">Specifications</h3>
                <div className="grid grid-cols-2 gap-3">
                  {product.specs.map((spec, index) => (
                    <div key={index} className="flex justify-between py-2 border-b border-border text-sm">
                      <span className="text-muted-foreground">{spec.label}</span>
                      <span className="font-medium text-foreground">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
