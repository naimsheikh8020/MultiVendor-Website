import HeroSection from "../features/Home/HeroSection";
import PopularProduct from "../features/Home/PopularProduct";
import TopCategory from "../features/Home/TopCategory";

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

        {/* Top Store */}

        {/* Tranding Section */}
      </div>
    </>
  );
};

export default Home;