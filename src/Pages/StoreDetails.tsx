import { useParams } from "react-router";
import { topStores } from "../assets/assets";
import StoreHeader from "../Components/StoreHeader";

const StoreDetails = () => {
  const { storeId } = useParams();
  const store = topStores.find((s) => s.id === Number(storeId));

  if (!store) {
    return <p className="text-center mt-10">Store not found</p>;
  }

  return (
    <>
      <StoreHeader />
    </>
  );
};

export default StoreDetails;