type DashboardCardProps = {
  icon: string;
  value: string | number;
  label: string;
};

const DashboardCard = ({ icon, value, label }: DashboardCardProps) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 w-full shadow-sm
                    transition-all duration-300 ease-out
                    hover:shadow-md hover:-translate-y-1 hover:border-gray-300">
      
      {/* Icon */}
      <div className="w-12 h-12 mb-5 transition-transform duration-300 ease-out group-hover:scale-105">
        <img
          src={icon}
          alt={label}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Value */}
      <h2 className="text-2xl font-bold text-gray-900 transition-colors duration-300">
         {value}
      </h2>

      {/* Label */}
      <p className="text-sm text-gray-500 mt-2">
        {label}
      </p>
    </div>
  );
};

export default DashboardCard;