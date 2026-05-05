import { API } from "./api";

export const getCartAPI = () => {
  return API.get("/api/v1/cart");
};

export const addToCartAPI = (data: {
  product: string;
  quantity: number;
  variant?: string;
}) =>
  API.post("/api/v1/cart/items/", data);

