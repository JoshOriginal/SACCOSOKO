import { Link } from "react-router-dom";
import { 
  Smartphone, 
  Shirt, 
  Home, 
  Dumbbell, 
  Baby, 
  Sparkles,
  Monitor,
  ShoppingBag,
  ChevronRight
} from "lucide-react";

const categories = [
  { 
    id: 1, 
    name: "Electronics", 
    icon: Smartphone, 
    count: 1250,
    color: "from-blue-500 to-blue-600"
  },
  { 
    id: 2, 
    name: "Fashion", 
    icon: Shirt, 
    count: 3420,
    color: "from-pink-500 to-rose-500"
  },
  { 
    id: 3, 
    name: "Home & Living", 
    icon: Home, 
    count: 890,
    color: "from-amber-500 to-secondary"
  },
  { 
    id: 4, 
    name: "Sports", 
    icon: Dumbbell, 
    count: 654,
    color: "from-green-500 to-emerald-500"
  },
  { 
    id: 5, 
    name: "Baby & Kids", 
    icon: Baby, 
    count: 478,
    color: "from-purple-500 to-violet-500"
  },
  { 
    id: 6, 
    name: "Beauty", 
    icon: Sparkles, 
    count: 1120,
    color: "from-red-500 to-pink-500"
  },
  { 
    id: 7, 
    name: "Computing", 
    icon: Monitor, 
    count: 567,
    color: "from-cyan-500 to-blue-500"
  },
  { 
    id: 8, 
    name: "All Categories", 
    icon: ShoppingBag, 
    count: 8500,
    color: "from-primary to-secondary"
  },
];

const CategoriesSection = () => {
  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-background">
      <div className="container px-3 sm:px-4">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">Shop by Category</h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">Browse our wide range of products</p>
          </div>
          <Link 
            to="/categories" 
            className="hidden sm:flex items-center gap-1 text-xs sm:text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            View All
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-3 md:gap-4">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/shop?category=${category.name.toLowerCase()}`}
              className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-card border border-border p-3 sm:p-4 hover:shadow-lg hover:border-primary/30 transition-all duration-300 animate-fade-in active:scale-95"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                <category.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-xs sm:text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2">
                {category.name}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5 sm:mt-1 line-clamp-1">
                {category.count.toLocaleString()} items
              </p>
            </Link>
          ))}
        </div>

        <Link 
          to="/categories" 
          className="flex sm:hidden items-center justify-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors mt-6"
        >
          View All Categories
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
};

export default CategoriesSection;
