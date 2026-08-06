import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import type { ReactNode } from "react";

const RedirectAuth = ({ children }: { children: ReactNode }) => {

    const { user } = useAuth();

    if (user) {
        return <Navigate to="/reviews" replace />
    };

    return children;
};

export default RedirectAuth;