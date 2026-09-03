import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from "@/contexts/CartContext";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Heart, 
  ShoppingCart, 
  Star, 
  Filter, 
  Grid3X3, 
  LayoutList,
  SlidersHorizontal,
  X
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { products } from "@/data/products";
import { getSellerById } from "@/data/sellers";

// Flattened view of the shared product catalog for this page's card/list UI
// (seller resolved to a display name, single cover image).
const allProducts = products.map((p) => ({
  id: p.id,
  name: p.name,
  price: p.price,
  originalPrice: p.originalPrice,
  image: p.images[0],
  seller: getSellerById(p.sellerId)?.businessName ?? "SACCO-SOKO Seller",
  sellerId: p.sellerId,
  rating: p.rating,
  reviews: p.reviews,
  category: p.category,
}));

const categories = [
  { id: "all", name: "All Products" },
  { id: "electronics", name: "Electronics" },
  { id: "fashion", name: "Fashion" },
  { id: "sports", name: "Sports" },
  { id: "baby", name: "Baby & Kids" },
  { id: "beauty", name: "Beauty" },
];

const Shop = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "all";
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
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

  const handleAddToCart = (product: (typeof allProducts)[number]) => {
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

  const filteredProducts = allProducts.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesCategory && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center gap-2">
              <Checkbox 
                id={category.id}
                checked={selectedCategory === category.id}
                onCheckedChange={() => setSelectedCategory(category.id)}
              />
              <label htmlFor={category.id} className="text-sm cursor-pointer">
                {category.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">Price Range</h3>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={50000}
            step={1000}
            className="mb-4"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{formatPrice(priceRange[0])}</span>
            <span>{formatPrice(priceRange[1])}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="bg-muted/30 min-h-screen">
        <div className="container px-3 sm:px-4 py-4 sm:py-6 lg:py-8">
          {/* Breadcrumb & Title */}
          <div className="mb-4 sm:mb-6">
            <nav className="text-xs sm:text-sm text-muted-foreground mb-2">
              <Link to="/" className="hover:text-primary">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">Shop</span>
            </nav>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">Shop All Products</h1>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-56 lg:w-64 shrink-0">
              <div className="bg-card rounded-lg sm:rounded-xl border border-border p-4 sm:p-5 sticky top-24">
                <h2 className="font-bold text-base sm:text-lg mb-4 flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 sm:h-5 sm:w-5" />
                  Filters
                </h2>
                <FilterSidebar />
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex flex-col xs:flex-row xs:flex-wrap items-start xs:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6 bg-card rounded-lg sm:rounded-xl border border-border p-3 sm:p-4">
                <div className="flex items-center gap-2 sm:gap-3 w-full xs:w-auto">
                  {/* Mobile filter */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm" className="lg:hidden gap-2 h-9 sm:h-10">
                        <Filter className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        <span className="text-xs sm:text-sm">Filters</span>
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-72 sm:w-80">
                      <SheetHeader>
                        <SheetTitle>Filters</SheetTitle>
                      </SheetHeader>
                      <div className="mt-6">
                        <FilterSidebar />
                      </div>
                    </SheetContent>
                  </Sheet>

                  <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
                    {sortedProducts.length} items
                  </span>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 w-full xs:w-auto">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full xs:w-40 h-9 sm:h-10 text-xs sm:text-sm">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Best Rating</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="hidden sm:flex items-center border border-border rounded-lg p-1">
                    <Button
                      variant={viewMode === "grid" ? "secondary" : "ghost"}
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setViewMode("grid")}
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "secondary" : "ghost"}
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setViewMode("list")}
                    >
                      <LayoutList className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              <div className={
                viewMode === "grid" 
                  ? "grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6"
                  : "space-y-2 sm:space-y-3 md:space-y-4"
              }>
                {sortedProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className={`group relative bg-card rounded-lg sm:rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300 animate-fade-in active:scale-95 ${
                      viewMode === "list" ? "flex" : ""
                    }`}
                    style={{ animationDelay: `${index * 0.03}s` }}
                  >
                    {/* Image */}
                    <div className={`relative overflow-hidden bg-muted ${
                      viewMode === "list" ? "w-24 sm:w-40 shrink-0" : "aspect-square"
                    }`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      <Badge 
                        variant="secondary" 
                        className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-destructive text-destructive-foreground font-bold text-xs sm:text-sm"
                      >
                        -{getDiscount(product.originalPrice, product.price)}%
                      </Badge>

                      <button className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 h-8 sm:h-9 w-8 sm:w-9 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary hover:text-primary-foreground active:scale-95">
                        <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-2 sm:p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground mb-0.5 sm:mb-1 line-clamp-1">{product.seller}</p>
                        <Link to={`/product/${product.id}`}>
                          <h3 className="font-semibold text-xs sm:text-sm text-foreground line-clamp-2 hover:text-primary transition-colors min-h-[2rem] sm:min-h-[2.5rem]">
                            {product.name}
                          </h3>
                        </Link>

                        <div className="flex items-center gap-0.5 mt-1 sm:mt-2">
                          <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-primary text-primary flex-shrink-0" />
                          <span className="text-xs sm:text-sm font-medium text-foreground">{product.rating}</span>
                          <span className="text-xs text-muted-foreground">({product.reviews})</span>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-baseline gap-1.5 sm:gap-2 mt-1.5 sm:mt-2">
                          <span className="text-base sm:text-lg font-bold text-primary">{formatPrice(product.price)}</span>
                          <span className="text-xs sm:text-sm text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
                        </div>

                        <Button 
                          variant="add-to-cart" 
                          size="sm" 
                          className="w-full mt-2 sm:mt-3 gap-2 h-8 sm:h-9 text-xs sm:text-sm"
                          onClick={() => handleAddToCart(product)}
                        >
                          <ShoppingCart className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          <span className="hidden xs:inline">Add to Cart</span>
                          <span className="xs:hidden">Add</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {sortedProducts.length === 0 && (
                <div className="text-center py-12 sm:py-16">
                  <p className="text-muted-foreground text-sm sm:text-base">No products found matching your filters.</p>
                  <Button 
                    variant="outline" 
                    className="mt-4 h-9 sm:h-10"
                    onClick={() => {
                      setSelectedCategory("all");
                      setPriceRange([0, 50000]);
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
