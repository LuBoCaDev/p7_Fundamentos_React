import { client, removeAuthorizationHeader, setAuthorizationHeader } from "../../api/client";
import storage from "../../utils/storage";
import type { Credentials, Login } from "./types";

export const login = async (credentials: Credentials, rememberMe: boolean) => {
  const response = await client.post<Login>("api/auth/login", credentials);
  const { accessToken } = response.data;
  
  if (rememberMe) {
    localStorage.setItem("auth", accessToken);
  } else {
    storage.set("auth", accessToken);
  }

  setAuthorizationHeader(accessToken);
};

export const logout = async () => {
  localStorage.removeItem("auth");
  storage.remove("auth");
  removeAuthorizationHeader();
};
