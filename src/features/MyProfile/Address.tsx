import { MapPin, Plus } from "lucide-react"
import { useState } from "react"
import EditAddressModal from "../../Components/EditAddressModal"
import AddAddressModal from "../../Components/AddAddressModal"
import { useAddresses } from "../Hooks/useAddress"
import { useDeleteAddress } from "../Hooks/useDeleteAddress";


const Address = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [activeAddress, setActiveAddress] = useState<any>(null)
  const { mutate: deleteMutate, isPending } = useDeleteAddress();

  // 🔥 GET API
  const { data, isLoading } = useAddresses()

  const addressList = data?.data || []

  const handleEditClick = (address: any) => {
    setActiveAddress(address)
    setIsEditModalOpen(true)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }
  const handleDelete = (id: number) => {
    deleteMutate(id);
  };
  return (
    <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-6">

      <div className="flex items-center justify-between mb-6">
        <h2 className="font-bold text-2xl text-gray-800">
          Saved Addresses
        </h2>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center cursor-pointer gap-2 text-sm text-blue-600 hover:underline"
        >
          <Plus size={16} />
          Add Address
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">

        {addressList.map((item: any) => (
          <div
            key={item.id}
            className="border border-gray-200 rounded-lg p-4 flex flex-col gap-5"
          >
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-gray-500" />
              <span className="text-lg font-medium capitalize">
                {item.label}
              </span>
            </div>

            <div className="text-sm text-gray-700 space-y-1">

              <p className="font-medium text-base">{item.full_name}</p>
              <p className="text-gray-500 text-base">{item.phone_number}</p>
              <p className="text-gray-600 text-base">{item.address}</p>

              <div className="flex gap-4 mt-4">

                <button
                  onClick={() => handleEditClick(item)}
                  className="text-base px-6 py-2 bg-blue-600 text-white cursor-pointer rounded-lg border border-blue-600 hover:bg-transparent hover:text-blue-600 transition-colors duration-200"
                >
                  Edit
                </button>

                <button
                  disabled={isPending}
                  onClick={() => handleDelete(item.id)}
                  className="text-base px-6 py-2 bg-red-600 text-white cursor-pointer rounded-lg border border-red-600 hover:bg-transparent hover:text-red-600 transition-colors duration-200 disabled:opacity-50"
                >
                  Delete
                </button>

              </div>

            </div>
          </div>
        ))}

      </div>

      {/* Modals */}
      <EditAddressModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        address={activeAddress}
      />

      <AddAddressModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={() => { }} // 🔥 no-op now
      />

    </div>
  )
}

export default Address