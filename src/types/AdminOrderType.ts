export type AdminOrder = {
  id: number;
  orderId: string;
  customer: string;
  store: string;
  date: string;
  price: number;
  commission: number;
  status: "Delivered" | "Pending" | "Processing" | "Cancelled" | "Shipped";
};