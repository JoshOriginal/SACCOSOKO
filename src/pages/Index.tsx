import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import ThreeAudiencesSection from "@/components/home/ThreeAudiencesSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import DeliveryRoutes from "@/components/home/DeliveryRoutes";
import SellerCTA from "@/components/home/SellerCTA";
import SaccoPartnerCTA from "@/components/home/SaccoPartnerCTA";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ThreeAudiencesSection />
      <CategoriesSection />
      <FeaturedProducts />
      <DeliveryRoutes />
      <SellerCTA />
      <SaccoPartnerCTA />
    </Layout>
  );
};

export default Index;
