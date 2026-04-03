import { Plus } from "lucide-react"
import PrimaryButton from "../../Components/PrimaryButton"

const VendorProduct = () => {
  return (
    <>
      <div className="flex justify-between">
        <div>
          <h1 className="font-bold text-xl text-gray-700 mb-1">Products</h1>
          <p className="text-gray-600">Manage your product inventory</p>
        </div>
        <PrimaryButton
          label="Add Category"
          icon={<Plus />}
          onClick={() => console.log("Clicked")}
        />
      </div>

    </>
  )
}

export default VendorProduct
