import apiClient from "./apiClient";

interface LoginResponse {
    id: number;
    username: string;
    role: string;
    token: string;
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
    logout
}