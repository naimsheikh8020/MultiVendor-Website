import { useState, useRef, useEffect } from "react";
import { Mail, Phone, MapPin, Calendar } from "lucide-react";
import VendorField from "../../Components/VendorDashBoard/Profile/VendorField";

const VendorProfile = () => {
  const [editingSection, setEditingSection] = useState<string | null>(null);

  // ✅ One ref per section (clean)
  const storeRef = useRef<HTMLInputElement | null>(null);
  const bankRef = useRef<HTMLInputElement | null>(null);
  const storyRef = useRef<HTMLTextAreaElement | null>(null);

  const [form, setForm] = useState({
    storeName: "TechGear Pro",
    ownerName: "John Smith",
    email: "john@techgear.com",
    phone: "+1 234 567 8900",
    address: "123 Business Street, Commerce City, NY 1000",
    joinedDate: "1/15/2024",
    gender: "Male",
    story:
      "In a bustling city market, Maria's Groceries has thrived for over 50 years...",
    bank: "Example Bank",
    account: "****1234",
    name: "John Smith",
    branch: "Barishal Street Branch",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Auto focus per section
  useEffect(() => {
    if (editingSection === "store" && storeRef.current) {
      storeRef.current.focus();
    }

    if (editingSection === "bank" && bankRef.current) {
      bankRef.current.focus();
    }

    if (editingSection === "story" && storyRef.current) {
      storyRef.current.focus();
    }
  }, [editingSection]);

  return (
    <div>
      {/* Header */}
      <h1 className="text-xl font-bold text-gray-700">Store Profile</h1>
      <p className="text-sm text-gray-600 mb-6">
        Manage your store information
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl">
              🏬
            </div>

            <h2 className="mt-3 font-semibold">{form.storeName}</h2>
            <p className="text-sm text-gray-500">{form.ownerName}</p>

            <span className="mt-2 inline-block px-3 py-1 text-xs bg-green-100 text-green-600 rounded-full">
              Approved
            </span>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-semibold mb-4">Quick Stats</h3>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Total Sales</span>
                <span className="font-semibold">$45600.00</span>
              </div>

              <div className="flex justify-between">
                <span>Net Earnings</span>
                <span className="text-green-600 font-semibold">
                  $41040.00
                </span>
              </div>

              <div className="flex justify-between">
                <span>Commission Paid</span>
                <span>$4560.00</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-2 space-y-6">
          {/* STORE INFO */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between mb-4">
              <h3 className="font-semibold">Store Information</h3>

              <button
                onClick={() =>
                  setEditingSection(
                    editingSection === "store" ? null : "store"
                  )
                }
                className="text-blue-600 text-sm cursor-pointer"
              >
                {editingSection === "store" ? "Save" : "Edit"}
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <VendorField
                ref={storeRef}
                label="Store Name"
                name="storeName"
                value={form.storeName}
                isEditing={editingSection === "store"}
                onChange={handleChange}
              />

              <VendorField
                label="Owner Name"
                name="ownerName"
                value={form.ownerName}
                isEditing={editingSection === "store"}
                onChange={handleChange}
              />

              <VendorField
                label="Email"
                name="email"
                value={form.email}
                isEditing={editingSection === "store"}
                onChange={handleChange}
                icon={<Mail size={16} />}
              />

              <VendorField
                label="Phone"
                name="phone"
                value={form.phone}
                isEditing={editingSection === "store"}
                onChange={handleChange}
                icon={<Phone size={16} />}
              />
            </div>

            <div className="mt-4">
              <VendorField
                label="Store Address"
                name="address"
                value={form.address}
                isEditing={editingSection === "store"}
                onChange={handleChange}
                icon={<MapPin size={16} />}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <VendorField
                label="Joined Date"
                name="joinedDate"
                value={form.joinedDate}
                isEditing={editingSection === "store"}
                onChange={handleChange}
                icon={<Calendar size={16} />}
              />

              <VendorField
                label="Gender"
                name="gender"
                value={form.gender}
                isEditing={editingSection === "store"}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* STORY */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between mb-2">
              <h3 className="font-semibold">Store Story</h3>

              <button
                onClick={() =>
                  setEditingSection(
                    editingSection === "story" ? null : "story"
                  )
                }
                className="text-blue-600 text-sm cursor-pointer"
              >
                {editingSection === "story" ? "Save" : "Edit"}
              </button>
            </div>

            <div className="bg-gray-50 p-4 rounded text-sm text-gray-600">
              {editingSection === "story" ? (
                <textarea
                  ref={storyRef}
                  name="story"
                  value={form.story}
                  onChange={handleChange}
                  className="w-full bg-transparent outline-none resize-none"
                  rows={4}
                />
              ) : (
                form.story
              )}
            </div>
          </div>

          {/* BANK */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between mb-4">
              <h3 className="font-semibold">Bank Information</h3>

              <button
                onClick={() =>
                  setEditingSection(
                    editingSection === "bank" ? null : "bank"
                  )
                }
                className="text-blue-600 text-sm cursor-pointer"
              >
                {editingSection === "bank" ? "Save" : "Edit"}
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <VendorField
                ref={bankRef}
                label="Name (matching the bank account)"
                name="name"
                value={form.name}
                isEditing={editingSection === "bank"}
                onChange={handleChange}
              />

              <VendorField
                label="Bank Name"
                name="bank"
                value={form.bank}
                isEditing={editingSection === "bank"}
                onChange={handleChange}
              />

              <VendorField
                label="Account Number"
                name="account"
                value={form.account}
                isEditing={editingSection === "bank"}
                onChange={handleChange}
              />

              <VendorField
                label="Branch Name"
                name="branch"
                value={form.branch}
                isEditing={editingSection === "bank"}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorProfile;