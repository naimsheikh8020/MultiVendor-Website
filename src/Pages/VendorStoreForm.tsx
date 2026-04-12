import React from "react";
import { MapPin, Phone } from "lucide-react";

type InputProps = {
  placeholder: string;
  icon?: React.ReactNode;
};

const InputField: React.FC<InputProps> = ({ placeholder, icon }) => {
  return (
    <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 h-11 w-full transition focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
      {icon && <span className="text-gray-400">{icon}</span>}
      <input
        type="text"
        placeholder={placeholder}
        className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400"
      />
    </div>
  );
};

const SelectField: React.FC = () => {
  return (
    <select className="w-full h-11 bg-gray-50 border border-gray-200 rounded-xl px-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
      <option>Dhaka</option>
    </select>
  );
};

const VendorStoreForm: React.FC = () => {
  return (
    <div className="py-10">
      {/* CONTAINER */}
      <div className="w-full">
        {/* TITLE */}
        <h2 className="text-xl font-semibold text-gray-800 mb-5">
          Fill this form
        </h2>

        {/* CARD */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
          <h3 className="text-base font-semibold text-gray-700 mb-6">
            Store Information
          </h3>

          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Store Name */}
            <div>
              <label className="text-sm text-gray-600 mb-1 block">
                Store Name
              </label>
              <InputField placeholder="TechGear Pro" />
            </div>

            {/* Owner Name */}
            <div>
              <label className="text-sm text-gray-600 mb-1 block">
                Owner Name
              </label>
              <InputField placeholder="John Smith" />
            </div>

            {/* Contact */}
            <div>
              <label className="text-sm text-gray-600 mb-1 block">
                Contact Number
              </label>
              <InputField
                placeholder="+1 234 567 8900"
                icon={<Phone size={16} />}
              />
            </div>

            {/* Secondary Contact */}
            <div>
              <label className="text-sm text-gray-600 mb-1 block">
                Secondary Contact Number
              </label>
              <InputField
                placeholder="+1 234 567 8900"
                icon={<Phone size={16} />}
              />
            </div>

            {/* OTP */}
            <div className="md:col-span-2">
              <label className="text-sm text-gray-600 mb-1 block">
                OTP Number
              </label>
              <InputField
                placeholder="+1 234 567 8900"
                icon={<Phone size={16} />}
              />
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="text-sm text-gray-600 mb-1 block">
                Store Address
              </label>
              <InputField
                placeholder="123 Business Street, Commerce City, NY 1000"
                icon={<MapPin size={16} />}
              />
            </div>

            {/* City + Zone + Area in one row */}
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* City */}
              <div>
                <label className="text-sm text-gray-600 mb-1 block">City</label>
                <SelectField />
              </div>

              {/* Zone */}
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Zone</label>
                <SelectField />
              </div>

              {/* Area */}
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Area</label>
                <SelectField />
              </div>
            </div>
          </div>
          {/* BANK INFORMATION */}
<div className="mt-10">

  <h3 className="text-base font-semibold text-gray-700 mb-6">
    Bank Information
  </h3>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

    {/* Name */}
    <div>
      <label className="text-sm text-gray-600 mb-1 block">
        Name (matching the bank account)
      </label>
      <InputField placeholder="John Smith" />
    </div>

    {/* Bank Name */}
    <div>
      <label className="text-sm text-gray-600 mb-1 block">
        Bank Name
      </label>
      <InputField placeholder="Example Bank" />
    </div>

    {/* Account Number */}
    <div>
      <label className="text-sm text-gray-600 mb-1 block">
        Account Number
      </label>
      <InputField placeholder="****1234" />
    </div>

    {/* Branch Name */}
    <div>
      <label className="text-sm text-gray-600 mb-1 block">
        Branch Name
      </label>
      <InputField placeholder="Barishal Street Branch" />
    </div>

  </div>
</div>

          {/* BUTTON */}
          <div className="mt-8 flex justify-start">
            <button className="px-8 h-11 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition flex items-center gap-2 shadow-sm">
              Submit
              <span className="text-lg">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorStoreForm;
