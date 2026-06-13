import API from "./axios";

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem(
      "token"
    )}`,
  },
});

export const getAllCategories =
  async () => {
    const response =
      await API.get(
        "/categories"
      );

    return response.data;
  };

export const createCategory =
  async (data) => {
    const response =
      await API.post(
        "/categories",
        data,
        getAuthConfig()
      );

    return response.data;
  };

export const deleteCategory =
  async (id) => {
    const response =
      await API.delete(
        `/categories/${id}`,
        getAuthConfig()
      );

    return response.data;
  };