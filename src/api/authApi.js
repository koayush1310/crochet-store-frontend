import API from "./axios";

export const registerUser = (
  data
) => {
  return API.post(
    "/auth/register",
    data
  );
};

export const loginUser = (
  data
) => {
  return API.post(
    "/auth/login",
    data
  );
};

export const getProfile = (
  token
) => {
  return API.get(
    "/auth/profile",
    {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    }
  );
};