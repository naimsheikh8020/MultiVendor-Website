import { UserCircle } from "lucide-react"

const ProfileInfo = () => {
  return (
    <>
      <div className="bg-white border rounded-xl p-6">

        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-gray-800">
            Personal Information
          </h2>

          <button className="text-blue-600 text-sm hover:underline">
            Edit
          </button>
        </div>

        <div className="flex gap-6 items-start">

          <div className="bg-blue-50 rounded-full p-4">
            <UserCircle size={32} className="text-blue-600" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4 text-sm">

            <div>
              <p className="text-gray-500">Full Name</p>
              <p className="font-medium">Akash</p>
            </div>

            <div>
              <p className="text-gray-500">Email</p>
              <p className="font-medium">customer@demo.com</p>
            </div>

            <div>
              <p className="text-gray-500">Phone</p>
              <p className="font-medium">+1 234 567 8900</p>
            </div>

            <div>
              <p className="text-gray-500">Gender</p>
              <p className="font-medium">Male</p>
            </div>

          </div>

        </div>

      </div>
    </>
  )
}

export default ProfileInfo