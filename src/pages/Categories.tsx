import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Grid3x3, List, TrendingUp, ShoppingBag } from 'lucide-react';

export default function Categories() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = [
    {
      id: 1,
      name: 'Electronics',
      icon: '📱',
      description: 'Smartphones, tablets, laptops, and accessories',
      products: 145,
      trending: true,
      image: '⚡',
      subcategories: ['Smartphones', 'Laptops', 'Tablets', 'Accessories', 'Wearables']
    },
    {
      id: 2,
      name: 'Home & Kitchen',
      icon: '🏠',
      description: 'Furniture, kitchenware, and home essentials',
      products: 234,
      trending: false,
      image: '🛋️',
      subcategories: ['Furniture', 'Kitchenware', 'Bedding', 'Decor', 'Storage']
    },
    {
      id: 3,
      name: 'Fashion & Apparel',
      icon: '👗',
      description: 'Clothing, shoes, and fashion accessories',
      products: 432,
      trending: true,
      image: '👔',
      subcategories: ['Men\'s Clothing', 'Women\'s Clothing', 'Shoes', 'Accessories', 'Sportswear']
    },
    {
      id: 4,
      name: 'Sports & Outdoors',
      icon: '⚽',
      description: 'Sports equipment and outdoor gear',
      products: 189,
      trending: false,
      image: '🏋️',
      subcategories: ['Equipment', 'Apparel', 'Footwear', 'Accessories', 'Camping Gear']
    },
    {
      id: 5,
      name: 'Books & Media',
      icon: '📚',
      description: 'Books, educational materials, and digital content',
      products: 312,
      trending: false,
      image: '📖',
      subcategories: ['Fiction', 'Non-Fiction', 'Textbooks', 'Educational', 'E-Books']
    },
    {
      id: 6,
      name: 'Health & Beauty',
      icon: '💄',
      description: 'Cosmetics, skincare, and wellness products',
      products: 278,
      trending: true,
      image: '🧴',
      subcategories: ['Skincare', 'Makeup', 'Hair Care', 'Wellness', 'Supplements']
    },
    {
      id: 7,
      name: 'Toys & Games',
      icon: '🎮',
      description: 'Toys, games, and entertainment for all ages',
      products: 156,
      trending: false,
      image: '🧩',
      subcategories: ['Board Games', 'Video Games', 'Toys', 'Puzzles', 'Action Figures']
    },
    {
      id: 8,
      name: 'Automotive',
      icon: '🚗',
      description: 'Car accessories and automotive products',
      products: 98,
      trending: false,
      image: '🔧',
      subcategories: ['Accessories', 'Tools', 'Parts', 'Cleaning', 'Electronics']
    },
  ];

  const allCategories = categories;
  const trendingCategories = categories.filter(cat => cat.trending);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Shop by Categories</h1>
          <p className="text-gray-600">Explore our wide range of product categories</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* View Toggle */}
        <div className="flex justify-end items-center gap-2 mb-6">
          <span className="text-sm text-gray-600">View:</span>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            <Grid3x3 size={20} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            <List size={20} />
          </button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="mb-8">
          <TabsList>
            <TabsTrigger value="all">All Categories</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
          </TabsList>

          {/* All Categories */}
          <TabsContent value="all" className="mt-6">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {allCategories.map(category => (
                  <Card key={category.id} className="hover:shadow-lg transition-all cursor-pointer group overflow-hidden">
                    <CardContent className="p-0">
                      <div className="bg-gradient-to-br from-green-50 to-blue-100 h-32 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-6xl">{category.image}</span>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg text-gray-900 mb-1">{category.name}</h3>
                        <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm text-primary font-medium flex items-center gap-1">
                            <ShoppingBag size={16} /> {category.products} Products
                          </span>
                        </div>
                        <Button className="w-full bg-primary hover:bg-secondary">
                          Browse
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {allCategories.map(category => (
                  <Card key={category.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="text-4xl">{category.image}</div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">{category.description}</p>
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-primary font-medium flex items-center gap-1">
                              <ShoppingBag size={16} /> {category.products} Products
                            </span>
                            <div className="flex gap-1">
                              {category.subcategories.slice(0, 3).map((sub, idx) => (
                                <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                  {sub}
                                </span>
                              ))}
                              {category.subcategories.length > 3 && (
                                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                  +{category.subcategories.length - 3}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <Button className="bg-primary hover:bg-secondary">Browse</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Trending Categories */}
          <TabsContent value="trending" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingCategories.map(category => (
                <Card key={category.id} className="border-2 border-primary hover:shadow-lg transition-all">
                  <CardContent className="p-0">
                    <div className="bg-gradient-to-br from-green-100 to-blue-200 h-32 flex items-center justify-center relative">
                      <span className="text-6xl">{category.image}</span>
                      <div className="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                        <TrendingUp size={14} /> Trending
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg text-gray-900 mb-1">{category.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                      <Button className="w-full bg-primary hover:bg-secondary">
                        Shop Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Featured Section */}
        <div className="mt-12 bg-gradient-to-r from-primary to-secondary rounded-lg p-8 text-white">
          <h2 className="text-3xl font-bold mb-3">Explore New Arrivals</h2>
          <p className="mb-6 text-white/90">Check out our latest products added to each category</p>
          <Button className="bg-white text-primary hover:bg-gray-100">
            View New Arrivals
          </Button>
        </div>
      </div>
    </div>
  );
}
