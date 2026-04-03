import React from "react";

type PrimaryButtonProps = {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  label,
  icon,
  onClick,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-2 rounded-full cursor-pointer
      bg-blue-600 border border-blue-600
      text-white text-base font-medium
      transition-all duration-300 ease-in-out
      hover:bg-white hover:text-blue-600
      active:scale-95
      ${className}`}
    >
      {icon && <span className="text-base flex items-center">{icon}</span>}
      <span>{label}</span>
    </button>
  );
};

export default PrimaryButton;