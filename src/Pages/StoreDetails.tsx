import { useParams } from "react-router";
import { useState } from "react";
import { topStores } from "../assets/assets";
import StoreHeader from "../Components/StoreHeader";
import StoreNav from "../features/HomeStore/StoreNav";
import type { Store } from "../types/store";
import StoreAllProduct from "../features/HomeStore/StoreAllProduct";
import StoreCategoryProduct from "../features/HomeStore/StoreCategoryProduct";
import StoreProfile from "../features/HomeStore/StoreProfile";


const Products = () => <StoreAllProduct/>;
const Categories = () => <StoreCategoryProduct/>;
const Profile = () => <StoreProfile/>;

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

      <div className="max-w-7xl mx-auto px-4 my-6">
        {activeTab === "products" && <Products />}
        {activeTab === "categories" && <Categories />}
        {activeTab === "profile" && <Profile />}
      </div>
    </>
  );
};

export default StoreDetails;