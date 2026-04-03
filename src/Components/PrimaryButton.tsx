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
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 sm:gap-3
      px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5
      rounded-full cursor-pointer
      bg-blue-600 border border-blue-600
      text-white text-sm sm:text-base md:text-lg font-medium
      transition-all duration-300 ease-in-out
      hover:bg-white hover:text-blue-600
      active:scale-95`}
    >
      {icon && (
        <span className="flex items-center text-sm sm:text-base">
          {icon}
        </span>
      )}
      <span className="whitespace-nowrap">{label}</span>
    </button>
  );
};

export default PrimaryButton;