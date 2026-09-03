import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import TrackOrder from "./pages/TrackOrder";
import Auth from "./pages/Auth";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import SellerRegister from "./pages/SellerRegister";
import HelpCenter from "./pages/HelpCenter";
import ShopAll from "./pages/ShopAll";
import Categories from "./pages/Categories";
import SellOnSokoSacco from "./pages/SellOnSokoSacco";
import AboutUs from "./pages/AboutUs";
import ReturnsRefunds from "./pages/ReturnsRefunds";
import ShippingInfo from "./pages/ShippingInfo";
import FAQs from "./pages/FAQs";
import ContactUs from "./pages/ContactUs";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AdminOrders from "./pages/AdminOrders";
import AdminCustomers from "./pages/AdminCustomers";
import AdminSettings from "./pages/AdminSettings";
import AdminAnalytics from "./pages/AdminAnalytics";
import AdminSellers from "./pages/AdminSellers";
import AdminReports from "./pages/AdminReports";
import AdminLayout from "./components/layout/AdminLayout";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import AdminLogin from "./pages/AdminLogin";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { OrderProvider } from "./contexts/OrderContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ThemeProvider } from "./contexts/ThemeContext";
import SellerLayout from "./components/layout/SellerLayout";
import SellerDashboard from "./pages/seller/SellerDashboard";
import SellerOrders from "./pages/seller/SellerOrders";
import SellerOrderDetail from "./pages/seller/SellerOrderDetail";
import SellerProducts from "./pages/seller/SellerProducts";
import SellerInventory from "./pages/seller/SellerInventory";
import SellerProfile from "./pages/seller/SellerProfile";
import SaccoLayout from "./components/layout/SaccoLayout";
import SaccoDashboard from "./pages/sacco/SaccoDashboard";
import SaccoOrders from "./pages/sacco/SaccoOrders";
import SaccoOrderDetail from "./pages/sacco/SaccoOrderDetail";
import SaccoRoutes from "./pages/sacco/SaccoRoutes";
import SaccoStages from "./pages/sacco/SaccoStages";
import SaccoDeliveries from "./pages/sacco/SaccoDeliveries";
import SaccoProfile from "./pages/sacco/SaccoProfile";
import SaccoBusinessValue from "./pages/sacco/SaccoBusinessValue";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
        <OrderProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop-all" element={<ShopAll />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/track-order" element={<TrackOrder />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/seller/register" element={<SellerRegister />} />
            <Route path="/sell" element={<SellOnSokoSacco />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/returns-refunds" element={<ReturnsRefunds />} />
            <Route path="/shipping-info" element={<ShippingInfo />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            
            {/* Admin Login Route */}
            <Route path="/admin-login" element={<AdminLogin />} />
            
            {/* Protected Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute><AdminLayout><AdminDashboard /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/products" element={<ProtectedRoute><AdminLayout><AdminProducts /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/orders" element={<ProtectedRoute><AdminLayout><AdminOrders /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/customers" element={<ProtectedRoute><AdminLayout><AdminCustomers /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/sellers" element={<ProtectedRoute><AdminLayout><AdminSellers /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/analytics" element={<ProtectedRoute><AdminLayout><AdminAnalytics /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/reports" element={<ProtectedRoute><AdminLayout><AdminReports /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/settings" element={<ProtectedRoute><AdminLayout><AdminSettings /></AdminLayout></ProtectedRoute>} />

            {/*
              Seller Portal (Phase 3). No hard auth gate: there is no real
              seller login yet (see src/data/demoSeller.ts) — the portal runs
              as a single, clearly-labelled demo seller instead of faking a
              production auth check.
            */}
            <Route path="/seller/dashboard" element={<SellerLayout><SellerDashboard /></SellerLayout>} />
            <Route path="/seller/orders" element={<SellerLayout><SellerOrders /></SellerLayout>} />
            <Route path="/seller/orders/:orderId" element={<SellerLayout><SellerOrderDetail /></SellerLayout>} />
            <Route path="/seller/products" element={<SellerLayout><SellerProducts /></SellerLayout>} />
            <Route path="/seller/inventory" element={<SellerLayout><SellerInventory /></SellerLayout>} />
            <Route path="/seller/profile" element={<SellerLayout><SellerProfile /></SellerLayout>} />

            {/*
              SACCO Operations Dashboard (Phase 4). Same no-hard-auth
              rationale as the Seller Portal — no real SACCO login exists yet
              (see src/data/demoSacco.ts), so this runs as a single,
              clearly-labelled demo SACCO session instead of faking one.
            */}
            <Route path="/sacco/dashboard" element={<SaccoLayout><SaccoDashboard /></SaccoLayout>} />
            <Route path="/sacco/orders" element={<SaccoLayout><SaccoOrders /></SaccoLayout>} />
            <Route path="/sacco/orders/:orderId" element={<SaccoLayout><SaccoOrderDetail /></SaccoLayout>} />
            <Route path="/sacco/routes" element={<SaccoLayout><SaccoRoutes /></SaccoLayout>} />
            <Route path="/sacco/stages" element={<SaccoLayout><SaccoStages /></SaccoLayout>} />
            <Route path="/sacco/deliveries" element={<SaccoLayout><SaccoDeliveries /></SaccoLayout>} />
            <Route path="/sacco/profile" element={<SaccoLayout><SaccoProfile /></SaccoLayout>} />
            <Route path="/sacco/business-value" element={<SaccoLayout><SaccoBusinessValue /></SaccoLayout>} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
          </TooltipProvider>
        </OrderProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
