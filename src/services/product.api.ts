// services/product.api.ts
import { API } from "./api";

export const getCategories = () =>
  API.get("/api/v1/products/categories/");