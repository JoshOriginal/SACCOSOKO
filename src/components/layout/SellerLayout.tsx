import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  Package,
  Boxes,
  Store,
  ArrowLeft,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getDemoSeller } from "@/data/demoSeller";

interface SellerLayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/seller/dashboard" },
  { label: "Orders", icon: ClipboardList, path: "/seller/orders" },
  { label: "Products", icon: Package, path: "/seller/products" },
  { label: "Inventory", icon: Boxes, path: "/seller/inventory" },
  { label: "Store Profile", icon: Store, path: "/seller/profile" },
];

const SellerLayout = ({ children }: SellerLayoutProps) => {
  const location = useLocation();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const seller = getDemoSeller();

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(`${path}/`);

  const SidebarContent = () => (
    <>
      <div className="p-5 border-b border-border">
        <Link to="/seller/dashboard" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-gradient-hero flex items-center justify-center shrink-0">
            <span className="text-primary-foreground font-bold text-sm">SS</span>
          </div>
          <div>
            <p className="font-display font-bold text-sm text-foreground leading-none">SACCO-SOKO</p>
            <p className="text-xs text-muted-foreground mt-0.5">Seller Portal</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileNavOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-muted"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}

        <div className="pt-3 mt-3 border-t border-border">
          <Link
            to="/"
            onClick={() => setMobileNavOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" />
            Back to Marketplace
          </Link>
        </div>
      </nav>

      <div className="p-4 border-t border-border">
        <div className="rounded-lg bg-brand-light-green p-3">
          <p className="text-xs font-medium text-muted-foreground">Demo Seller Session</p>
          <p className="text-sm font-semibold text-foreground truncate mt-0.5">{seller.businessName}</p>
          <p className="text-xs text-muted-foreground truncate">{seller.location}</p>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-64 shrink-0 bg-card border-r border-border">
        <SidebarContent />
      </aside>

      {/* Mobile off-canvas sidebar */}
      {mobileNavOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-foreground/40"
            onClick={() => setMobileNavOpen(false)}
          />
          <aside className="relative z-10 w-72 max-w-[80vw] bg-card border-r border-border flex flex-col h-full animate-slide-up">
            <button
              className="absolute top-4 right-4 h-8 w-8 rounded-lg flex items-center justify-center hover:bg-muted"
              onClick={() => setMobileNavOpen(false)}
            >
              <X className="h-4 w-4" />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-card border-b border-border">
          <div className="flex items-center justify-between h-14 px-4 sm:px-6">
            <div className="flex items-center gap-3">
              <button
                className="lg:hidden h-9 w-9 rounded-lg flex items-center justify-center hover:bg-muted"
                onClick={() => setMobileNavOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </button>
              <h1 className="font-semibold text-foreground">Seller Portal</h1>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0">
                {seller.businessName.charAt(0)}
              </div>
              <span className="hidden sm:inline text-sm font-medium text-foreground">{seller.businessName}</span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 min-w-0">{children}</main>
      </div>
    </div>
  );
};

export default SellerLayout;
