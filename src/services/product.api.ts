// services/product.api.ts
import { API } from "./api";

export const getCategories = () =>
  API.get("/api/v1/products/categories/").then(response => response.data.results);

export const getProductsByCategory = (slug: string) =>
  API.get(`/api/v1/products/categories/${slug}/`);

export const getProductDetails = (id: string) =>
  API.get(`/api/v1/products/${id}`);

export const getProducts = () =>
  API.get("/api/v1/products/");

export const searchProducts = (query: string) => {
  const endpoint = `/api/v1/products/search/?q=${encodeURIComponent(query)}`;
  console.log("🔍 Searching products:", endpoint);
  return API.get(endpoint)
    .then(response => {
      console.log("✅ Search API response:", response.data);
      return response.data.results || response.data;
    })
    .catch(error => {
      console.error("❌ Search API error:", error);
      throw error;
    });
};