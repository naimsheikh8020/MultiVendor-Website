import { API } from "./api";

// 🔥 Types
export type Review = {
  id: number;
  user_name: string;
  user_avatar: string | null;
  rating: number;
  comment: string;
  images: string[];
  created_at: string;
};

export type ReviewResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Review[];
};

// 🔥 API
export const getProductReviews = async (url: string): Promise<ReviewResponse> => {
  const res = await API.get(url);
  return res.data;
};