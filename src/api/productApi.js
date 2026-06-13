import API from "./axios";

export const getProducts = async (
  params = {}
) => {
  const response =
    await API.get(
      "/products",
      {
        params,
      }
    );

  return response.data;
};

export const getProductById =
  async (id) => {
    const response =
      await API.get(
        `/products/${id}`
      );

    return response.data;
  };

export const getFeaturedProducts =
  async () => {
    const response =
      await API.get(
        "/products/featured"
      );

    return response.data;
  };

export const getRelatedProducts =
  async (id) => {
    const response =
      await API.get(
        `/products/related/${id}`
      );

    return response.data;
  };