import API from "./axios";

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem(
      "token"
    )}`,
  },
});

export const getWishlist =
  async () => {
    const response =
      await API.get(
        "/wishlist",
        getAuthConfig()
      );

    return response.data;
  };

export const addToWishlist =
  async (productId) => {
    const response =
      await API.post(
        `/wishlist/${productId}`,
        {},
        getAuthConfig()
      );

    return response.data;
  };

export const removeFromWishlist =
  async (productId) => {
    const response =
      await API.delete(
        `/wishlist/${productId}`,
        getAuthConfig()
      );

    return response.data;
  };