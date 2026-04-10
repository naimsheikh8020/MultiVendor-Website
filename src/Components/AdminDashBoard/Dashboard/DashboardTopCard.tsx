type DashboardTopCardProps = {
  icon: string;
  value: string | number;
  label: string;
  growth?: string;
};

const DashboardTopCard = ({
  icon,
  value,
  label,
  growth,
}: DashboardTopCardProps) => {
  return (
    <div className="bg-white border border-gray-100 shadow rounded-xl p-6 flex flex-col gap-4 w-full">
      <div className="flex items-center justify-between">
        <div className="">
          <img src={icon} alt={label} className="w-12 object-contain" />
        </div>

        {growth && (
          <span className="text-green-600 text-base font-medium">
            {growth}
          </span>
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-700 mt-2">{value}</h2>
        <p className="text-gray-500 text-base mt-2">{label}</p>
      </div>
    </div>
  );
};

export default DashboardTopCard;