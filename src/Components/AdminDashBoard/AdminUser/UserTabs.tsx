type Props = {
  active: "vendors" | "customers";
  onChange: (val: "vendors" | "customers") => void;
};

const UserTabs = ({ active, onChange }: Props) => {
  return (
    <div className="flex gap-2">
      {["vendors", "customers"].map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab as any)}
          className={`px-4 py-2 rounded-lg text-sm font-medium capitalize ${
            active === tab
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default UserTabs;