import API from "./axios";

const getAuthConfig = () => {
  const token =
    localStorage.getItem("token");

  console.log(
    "PRODUCT TOKEN:",
    token
  );

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getAllProducts =
  async () => {
    const response =
      await API.get(
        "/products",
        getAuthConfig()
      );

    return response.data;
  };

export const createProduct =
  async (data) => {
    const response =
      await API.post(
        "/products",
        data,
        getAuthConfig()
      );

    return response.data;
  };

export const deleteProduct =
  async (id) => {
    const response =
      await API.delete(
        `/products/${id}`,
        getAuthConfig()
      );

    return response.data;
  };

export const getProductById =
  async (id) => {
    const response =
      await API.get(
        `/products/${id}`,
        getAuthConfig()
      );

    return response.data;
  };

export const updateProduct =
  async (id, data) => {
    const response =
      await API.put(
        `/products/${id}`,
        data,
        getAuthConfig()
      );

    return response.data;
  };