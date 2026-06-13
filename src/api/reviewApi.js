import API from "./axios";

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem(
      "token"
    )}`,
  },
});

export const createReview =
  async (reviewData) => {
    const response =
      await API.post(
        "/reviews",
        reviewData,
        getAuthConfig()
      );

    return response.data;
  };

export const getReviews =
  async (productId) => {
    const response =
      await API.get(
        `/reviews/${productId}`
      );

    return response.data;
  };

export const deleteReview =
  async (reviewId) => {
    const response =
      await API.delete(
        `/reviews/${reviewId}`,
        getAuthConfig()
      );

    return response.data;
  };