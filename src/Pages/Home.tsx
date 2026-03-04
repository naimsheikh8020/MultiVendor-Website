import BestProduct from "../features/Home/BestProduct";
import HeroSection from "../features/Home/HeroSection";
import PopularProduct from "../features/Home/PopularProduct";
import ProductHighlightsSection from "../features/Home/ProductHighlightsSection";
import TopCategory from "../features/Home/TopCategory";
import TopStore from "../features/Home/TopStore";

const Home = () => {
  return (
    <>
      <div className="py-6">
        {/* Hero Section */}
        <HeroSection />

        {/* Top Category Section */}
        <TopCategory/>

        {/* Popular Product */}
        <PopularProduct/>

        {/* Best Offer */}
        <BestProduct/>

        {/* Top Store */}
        <TopStore/>

        
      </div>
    </>
  );
};

export default Home;