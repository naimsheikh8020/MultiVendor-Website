import LocationCard from "./LocationCard";
import StoryCard from "./StoryCard";
import VendorInfoCard from "./VendorInfoCard";

const StoreProfile = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
      <VendorInfoCard />
      <LocationCard />
      <StoryCard />
    </div>
  );
};

export default StoreProfile
