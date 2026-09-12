import AboutSection from "../../components/AboutSection/AboutSection";
import CategorySection from "../../components/CategorySection/CategorySection";
import Hero from "../../components/Hero/Hero";
import JustInSection from "../../components/JustInSection/JustInSection";
import NewArrivals from "../../components/NewArrivals/NewArrivals";
import SaleSection from "../../components/SaleSection/SaleSection";
import WhyIvoriaSection from "../../components/WhyIvoriaSection/WhyIvoriaSection";

function Home() {
  return (
    <>
      <Hero />
      <CategorySection />
      <NewArrivals />
      <SaleSection />
      <JustInSection />
      <WhyIvoriaSection />
      <AboutSection />
    </>
  );
}

export default Home;
