import apiClient from "./apiClient";

const login = async (email: string, password: string) => {
    const res = await apiClient.post(
        "/auth/login",
        { email, password },
        { skipAuthRedirect: true }
    );
    return res.data;
};

export default {
    login
}