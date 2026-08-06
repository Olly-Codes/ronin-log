import type { LoginResponse, RegisterPayload, RegisterResponse } from "../types/types";
import apiClient from "./apiClient";

const register = async (payload: RegisterPayload): Promise<RegisterResponse> => {
  const res = await apiClient.post<RegisterResponse>("/auth/register", payload);
  return res.data;
};

const login = async (email: string, password: string): Promise<LoginResponse> => {
    const res = await apiClient.post<LoginResponse>(
        "/auth/login",
        { email, password },
        { skipAuthRedirect: true }
    );
    return res.data;
};

const logout = () => {
    localStorage.removeItem("token");
};

export default {
    login,
    logout,
    register
}