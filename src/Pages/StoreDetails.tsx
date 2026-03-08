import { useParams } from "react-router";
import { topStores } from "../assets/assets";

const StoreDetails = () => {
  const { storeId  } = useParams();
  const store = topStores.find((s) => s.id === Number(storeId));

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Store Details for Store ID: {storeId }</h1>
      <p className="text-gray-600">{store?.title}</p>
    </div>
  )
}

export default StoreDetails
