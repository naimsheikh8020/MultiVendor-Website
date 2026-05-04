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


export const addReview = async ({
  productId,
  formData,
}: {
  productId: string;
  formData: FormData;
}) => {
  const res = await API.post(
    `/api/v1/products/${productId}/reviews/add/`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res.data;
};