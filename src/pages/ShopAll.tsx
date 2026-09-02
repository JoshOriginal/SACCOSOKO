import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Heart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/components/ui/use-toast';
import { products as catalogProducts } from '@/data/products';
import { getSellerById } from '@/data/sellers';

export default function ShopAll() {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [favorites, setFavorites] = useState<number[]>([]);
  const { addToCart } = useCart();
  const { toast } = useToast();

  // Shared product catalog (see src/data/products.ts), flattened for this
  // page's simpler card layout.
  const products = catalogProducts.map((p) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    category: p.category.charAt(0).toUpperCase() + p.category.slice(1),
    image: p.images[0],
    seller: getSellerById(p.sellerId)?.businessName ?? "SACCO-SOKO Seller",
    rating: p.rating,
  }));

  const categories = ['All', 'Electronics', 'Fashion', 'Sports', 'Baby', 'Beauty'];

  const filteredProducts = products
    .filter(p => selectedCategory === 'all' || p.category.toLowerCase() === selectedCategory.toLowerCase())
    .filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
    .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  const toggleFavorite = (id: number) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]);
  };

  const handleAddToCart = (product: typeof products[number]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      seller: product.seller,
      quantity: 1,
    });
    toast({
      title: "Added to Cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Shop All Products</h1>
          <p className="text-gray-600">Browse our complete collection of quality products</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4 space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Filter size={18} /> Filters
                </h3>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Categories */}
              <div>
                <h4 className="font-medium text-gray-700 mb-3">Categories</h4>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <Button
                      key={cat}
                      variant={selectedCategory === cat.toLowerCase() ? 'default' : 'outline'}
                      className="w-full justify-start"
                      onClick={() => setSelectedCategory(cat.toLowerCase())}
                    >
                      {cat}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="font-medium text-gray-700 mb-3">Price Range</h4>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  min={0}
                  max={50000}
                  step={1000}
                  className="mb-3"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>KES {priceRange[0]}</span>
                  <span>KES {priceRange[1]}</span>
                </div>
              </div>

              {/* Sort */}
              <div>
                <h4 className="font-medium text-gray-700 mb-3">Sort By</h4>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Top Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full bg-primary hover:bg-secondary">
                Clear Filters
              </Button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-600">Showing {sortedProducts.length} products</p>
            </div>

            {sortedProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProducts.map(product => (
                  <Card key={product.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                    <CardContent className="p-0">
                      <div className="bg-gray-100 h-48 relative overflow-hidden group">
                        <Link to={`/product/${product.id}`}>
                          <img src={product.image} alt={product.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        </Link>
                        <button
                          onClick={() => toggleFavorite(product.id)}
                          className="absolute top-3 right-3 bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Heart
                            size={20}
                            className={favorites.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}
                          />
                        </button>
                      </div>
                      <div className="p-4">
                        <Link to={`/product/${product.id}`}>
                          <h3 className="font-semibold text-gray-900 mb-2 hover:text-primary transition-colors line-clamp-2">{product.name}</h3>
                        </Link>
                        <div className="flex justify-between items-center mb-3">
                          <Badge variant="secondary">{product.category}</Badge>
                          <span className="text-sm text-yellow-500">★ {product.rating}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-2xl font-bold text-primary">KES {product.price.toLocaleString()}</span>
                        </div>
                        <Button className="w-full mt-4 bg-primary hover:bg-secondary" onClick={() => handleAddToCart(product)}>
                          Add to Cart
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
