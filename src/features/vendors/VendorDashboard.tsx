import { assets } from "../../assets/assets";
import DashboardCard from "../../Components/VendorDashBoard/Dashboard/DashboardCard";
import DashboardTopProduct from "../../Components/VendorDashBoard/Dashboard/DashboardTopProduct";
import RecentOrders from "../../Components/VendorDashBoard/Dashboard/RecentOrders";

const VendorDashboard = () => {
  const stats = [
    {
      icon: assets.VendorTotalSales,
      value: "৳ 45600.00",
      label: "Total Sales",
    },
    {
      icon: assets.VendorNetEarning,
      value: "৳ 45600.00",
      label: "Net Earnings",
    },
    {
      icon: assets.VendorTotalProduct,
      value: "5",
      label: "Total Products",
    },
    {
      icon: assets.VendorTotalOrder,
      value: "1000",
      label: "Total Orders",
    },
  ];
  const orders = [
    {
      id: "ord-001",
      customer: "John Doe",
      date: "1/15/2026",
      total: "$459.98",
      status: "Delivered",
    },
    {
      id: "ord-002",
      customer: "John Doe",
      date: "1/15/2026",
      total: "$459.98",
      status: "Processing",
    },
  ];
  const products = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: "$159.99",
    stock: 45,
    image: assets.HeadPhone,
  },
  {
    id: "2",
    name: "Designer Leather Handbag",
    price: "$189.99",
    stock: 25,
    image: assets.redBag,
  },
  {
    id: "3",
    name: "Casual Denim Jacket",
    price: "$79.99",
    stock: 60,
    image: assets.BlackJacket,
  },
  {
    id: "4",
    name: "Smartphone Pro Max",
    price: "$999.99",
    stock: 40,
    image: assets.MobilePhone,
  },
];
  return (
    <div>
      {/* Header */}
      <h1 className="font-bold text-xl text-gray-700 mb-1">
        Dashboard
      </h1>

      <p className="text-gray-500">
        Welcome back,{" "}
        <span className="font-semibold text-blue-600">
          Sohan Smith
        </span>
        !
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
        {stats.map((item, index) => (
          <DashboardCard
            key={index}
            icon={item.icon}
            value={item.value}
            label={item.label}
          />
        ))}
      </div>

      <RecentOrders orders={orders} />

      <DashboardTopProduct products={products} />
    </div>
  );
};

export default VendorDashboard;