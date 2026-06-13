import API from "./axios";

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem(
      "token"
    )}`,
  },
});

export const createOrder =
  async (orderData) => {
    const response =
      await API.post(
        "/orders",
        orderData,
        getAuthConfig()
      );

    return response.data;
  };

export const getMyOrders =
  async () => {
    const response =
      await API.get(
        "/orders/my-orders",
        getAuthConfig()
      );

    return response.data;
  };