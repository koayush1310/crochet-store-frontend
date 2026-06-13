import API from "./axios";

export const uploadImage = async (file) => {
  const token = localStorage.getItem("token");

  console.log("UPLOAD TOKEN:", token);

  const formData = new FormData();

  formData.append("images", file);

  const response = await API.post(
    "/upload",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data;
};