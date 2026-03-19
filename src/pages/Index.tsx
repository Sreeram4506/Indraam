import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { ServicesSection } from "@/components/ServicesSection";
import { Footer } from "@/components/Footer";
import PageLoader from "@/components/PageLoader";
import CustomCursor from "@/components/CustomCursor";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

const Index = () => {
  useSmoothScroll();

  return (
    <>
      <CustomCursor />
      <PageLoader />

      <div className="min-h-screen bg-[#080808] text-white selection:bg-white selection:text-black">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <FeaturedProjects />
        <ServicesSection />
        <Footer />
      </div>
    </>
  );
};

export default Index;
