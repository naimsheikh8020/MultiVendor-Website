// services/product.api.ts
import { API } from "./api";

export const getCategories = () =>
  API.get("/api/v1/products/categories/");

export const getProductsByCategory = (slug: string) =>
  API.get(`/api/v1/products/categories/${slug}/`);

export const getProductDetails = (id: string) =>
  API.get(`/api/v1/products/${id}`);