import type { Customer, Vendor } from "../../types/AdminUser";

const statuses: Vendor["status"][] = ["Approved", "Pending", "Rejected"];

export const vendors: Vendor[] = Array.from({ length: 20 }, (_, i) => {
  const sales = +(Math.random() * 1000 + 50).toFixed(2);
  const balance = +(Math.random() * 500).toFixed(2);

  return {
    id: String(i + 1),
    name: `Vendor ${i + 1}`,
    email: `vendor${i + 1}@example.com`,
    store: `Store ${i + 1}`,

    totalSales: sales,
    balance: balance,

    joined: "15/01/2024",
    status: statuses[i % statuses.length], // 🔥 cycles Approved/Pending/Rejected
  };
});

export const customers: Customer[] = Array.from({ length: 20 }, (_, i) => {
  const totalOrders = Math.floor(Math.random() * 10) + 1;

  const totalSpend = +(Math.random() * 1000 + 50).toFixed(2);

  const cancelCount = Math.floor(Math.random() * 4); // 0–3

  return {
    id: String(i + 1),
    name: `Customer ${i + 1}`,
    email: `customer${i + 1}@example.com`,

    totalOrders,
    totalSpend,
    cancelCount,

    joined: "15/01/2024",
   
  };
});