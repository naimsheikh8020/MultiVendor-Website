import { Plus } from "lucide-react"
import PrimaryButton from "../../Components/PrimaryButton"

const VendorProduct = () => {
  return (
    <div>
      <h1>hello</h1>
      <PrimaryButton
        label="Add Category"
        icon={<Plus />}
        onClick={() => console.log("Clicked")}
      />
    </div>
  )
}

export default VendorProduct
