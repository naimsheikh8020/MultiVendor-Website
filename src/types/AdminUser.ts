export type Vendor = {
  id: string;
  name: string;
  email: string;
  store: string;
  totalSales: number; // ✅ NUMBER (not string)
  balance: number;   // ✅ NUMBER (not string)
  joined: string;
  status: "Approved" | "Pending" | "Rejected";
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  totalOrders: number;     // ✅ ALWAYS number
  totalSpend: number;      // ✅ number (format in UI)
  cancelCount: number;     // ✅ no null, default = 0
  joined: string;

};