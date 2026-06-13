import API from "./axios";

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem(
      "token"
    )}`,
  },
});

export const getDashboardStats =
  async () => {
    const response =
      await API.get(
        "/admin/dashboard",
        getAuthConfig()
      );

    return response.data;
  };

export const getRecentOrders =
  async () => {
    const response =
      await API.get(
        "/admin/recent-orders",
        getAuthConfig()
      );

    return response.data;
  };

export const getMonthlyRevenue =
  async () => {
    const response =
      await API.get(
        "/admin/monthly-revenue",
        getAuthConfig()
      );

    return response.data;
  };

export const getTopProducts =
  async () => {
    const response =
      await API.get(
        "/admin/top-products",
        getAuthConfig()
      );

    return response.data;
  };