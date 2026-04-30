import { API } from "./api";

export const getAddresses = () =>
  API.get("/api/v1/accounts/customer/profile/address/");

export const updateAddress = (id: number, data: any) =>
  API.patch(`/api/v1/accounts/customer/profile/address/${id}/`, data);


export const deleteAddress = (id: number) =>
  API.delete(`/api/v1/accounts/customer/profile/address/${id}/`);