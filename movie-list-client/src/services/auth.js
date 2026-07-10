import api from "./api";

export const loginUser = async (email, password) => {
  const res = await api.post("/auth/signIn", {
    email,
    password,
  });

  return res.data;
};


export const signUpUser = async (name,email, password) => {
  const res = await api.post("/auth/signUp", {
    name,
    email,
    password,
  });

  return res.data;
};