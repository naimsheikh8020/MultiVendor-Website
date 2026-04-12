type AdminPayoutCardProps = {
  icon: string; // image path or URL
  value: string;
  title: string;
  subtitle?: string;
  trend?: string; // e.g. "+8.2%"
};

const AdminPayoutCard = ({
  icon,
  value,
  title,
  subtitle,
  trend,
}: AdminPayoutCardProps) => {
  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-all duration-200">
      
      {/* Top Section */}
      <div className="flex items-start justify-between">
        
        {/* Icon */}
        <div className="w-16 h-16 flex items-center justify-center">
          <img src={icon} alt="icon" className="w-12 h-12 object-contain" />
        </div>

        {/* Trend */}
        {trend && (
          <span className="text-base font-medium text-green-500">
            {trend}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="mt-4">
        <h2 className="text-2xl font-semibold text-gray-900">
          {value}
        </h2>

        <p className="text-base text-gray-600 mt-3">
          {title}
        </p>

        {subtitle && (
          <p className="text-sm text-gray-400 mt-1">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminPayoutCard;