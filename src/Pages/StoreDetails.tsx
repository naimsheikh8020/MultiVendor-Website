import { useParams } from "react-router";
import { useState } from "react";
import { topStores } from "../assets/assets";
import StoreHeader from "../Components/StoreHeader";
import StoreNav from "../Components/StoreNav";
import type { Store } from "../types/store";


const Products = () => <div className="p-4">All Products</div>;
const Categories = () => <div className="p-4">Categories</div>;
const Profile = () => <div className="p-4">Profile</div>;

const StoreDetails = () => {
  const { storeId } = useParams<{ storeId: string }>();

  const store: Store | undefined = topStores.find(
    (s: Store) => s.id === Number(storeId)
  );

  const [activeTab, setActiveTab] = useState<
    "products" | "categories" | "profile"
  >("products");

  if (!store) {
    return <p className="text-center mt-10">Store not found</p>;
  }

  return (
    <>
      <StoreHeader store={store} />

      <StoreNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="max-w-7xl mx-auto px-4 mt-6">
        {activeTab === "products" && <Products />}
        {activeTab === "categories" && <Categories />}
        {activeTab === "profile" && <Profile />}
      </div>
    </>
  );
};

export default StoreDetails;