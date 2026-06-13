import API from "./axios";

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem(
      "token"
    )}`,
  },
});

export const getProfile =
  async () => {
    const response =
      await API.get(
        "/auth/profile",
        getAuthConfig()
      );

    return response.data;
  };

export const updateProfile =
  async (data) => {
    const response =
      await API.put(
        "/auth/profile",
        data,
        getAuthConfig()
      );

    return response.data;
  };

export const addAddress =
  async (data) => {
    const response =
      await API.post(
        "/auth/address",
        data,
        getAuthConfig()
      );

    return response.data;
  };

export const deleteAddress =
  async (index) => {
    const response =
      await API.delete(
        `/auth/address/${index}`,
        getAuthConfig()
      );

    return response.data;
  };