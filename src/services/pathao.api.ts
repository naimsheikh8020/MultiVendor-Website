import { API } from "./api";

export const getCities = () =>
  API.get("/api/v1/orders/pathao/cities/");

export const getZones = (city_id: number) =>
  API.get(`/api/v1/orders/pathao/zones/?city_id=${city_id}`);

export const getAreas = (zone_id: number) =>
  API.get(`/api/v1/orders/pathao/areas/?zone_id=${zone_id}`);