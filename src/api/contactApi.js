import API from "./axios";

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem(
      "token"
    )}`,
  },
});

export const createContact =
  async (data) => {
    const response =
      await API.post(
        "/contact",
        data
      );

    return response.data;
  };

export const getContacts =
  async () => {
    const response =
      await API.get(
        "/contact",
        getAuthConfig()
      );

    return response.data;
  };

export const updateContactStatus =
  async (id, status) => {
    const response =
      await API.put(
        `/contact/${id}/status`,
        { status },
        getAuthConfig()
      );

    return response.data;
  };

export const deleteContact =
  async (id) => {
    const response =
      await API.delete(
        `/contact/${id}`,
        getAuthConfig()
      );

    return response.data;
  };