import React, { forwardRef } from "react";

type Props = {
  label: string;
  name: string;
  value: string;
  isEditing: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
};

const VendorField = forwardRef<HTMLInputElement, Props>(
  ({ label, name, value, isEditing, onChange, icon }, ref) => {
    return (
      <div>
        <p className="text-xs text-gray-500 mb-1">{label}</p>

        <div className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 text-sm bg-gray-50 focus-within:border-blue-600">
          {icon && <span className="text-gray-400">{icon}</span>}

          {isEditing ? (
            <input
              ref={ref}
              name={name}
              value={value}
              onChange={onChange}
              className="w-full bg-transparent outline-none"
            />
          ) : (
            <span className="text-gray-700">{value}</span>
          )}
        </div>
      </div>
    );
  }
);

export default VendorField;