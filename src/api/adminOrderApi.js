import API from "./axios";

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem(
      "token"
    )}`,
  },
});

export const getOrders =
  async () => {
    const response =
      await API.get(
        "/orders",
        getAuthConfig()
      );

    return response.data;
  };

export const updateOrderStatus =
  async (id, status) => {
    const response =
      await API.put(
        `/orders/${id}/status`,
        { status },
        getAuthConfig()
      );

    return response.data;
  };