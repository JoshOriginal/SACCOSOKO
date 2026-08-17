import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import DeliveryRoutes from "@/components/home/DeliveryRoutes";
import SellerCTA from "@/components/home/SellerCTA";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <CategoriesSection />
      <FeaturedProducts />
      <DeliveryRoutes />
      <SellerCTA />
    </Layout>
  );
};

export default Index;
