type ProductCardProps = {
  value: number | string;
  label: string;
  color?: "default" | "green" | "red" | "yellow" | "blue" | "purple";
};

const ProductCard = ({ value, label, color = "default" }: ProductCardProps) => {
  const valueColor =
  color === "green"
    ? "text-green-600"
    : color === "red"
    ? "text-red-600"
    : color === "yellow"
    ? "text-yellow-500"
    : color === "blue"
    ? "text-blue-600"
    : color === "purple"
    ? "text-purple-600"
    : "text-gray-900";

  return (
    <div className="rounded-xl bg-white p-4 shadow-base border border-gray-100 shadow-sm">
      <h2 className={`text-xl font-semibold ${valueColor}`}>
        {value}
      </h2>
      <p className="text-base text-gray-500 mt-1">{label}</p>
    </div>
  );
};

export default ProductCard;