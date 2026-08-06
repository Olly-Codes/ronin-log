import { createContext, useState } from "react";
import type { ReactNode } from "react";
import authAPI from "../api/authAPI";

interface User {
    id: number;
    username: string;
    role: string;
    token?: string;
};

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | null >(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [user, setUser] = useState<User | null>(() => {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (token && storedUser) {
            return ({ ...JSON.parse(storedUser), token});
        }
        return null;
    });

    const login = async (email: string, password: string) => {
        const userData = await authAPI.login(email, password);
        localStorage.setItem("token", userData.token);
        localStorage.setItem("user", JSON.stringify({
            id: userData.id,
            username: userData.username,
            role: userData.role
        }));
        setUser({
            id: userData.id,
            username: userData.username,
            role: userData.role
        });
    };

    const logout = () => {
        authAPI.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;