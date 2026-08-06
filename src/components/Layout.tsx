import { Outlet, useNavigate } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAuth } from "../hooks/useAuth";

const Layout = () => {

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <>
            <header className="h-16 bg-surface border-b border-border flex items-center justify-around text-primary font-bold">
                <p>Ronin <span className="text-accent">Log</span></p>
                <Navbar />
                {user ? (
                    <div className="flex items-center gap-4">
                        <p>{user.username}</p>
                        <button 
                            onClick={logout}
                            className="px-2 cursor-pointer bg-red-600 py-2 hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => navigate("/auth/login")}
                            className="px-2 cursor-pointer bg-red-600 py-2 hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
                        >
                            Login
                        </button>
                        <button 
                            onClick={() => navigate("/auth/register")}
                            className="px-2 cursor-pointer border border-text-muted py-2 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
                        >
                            Register
                        </button>
                    </div>
                )}
            </header>

            <Outlet />

            <footer>
                <Footer />
            </footer>
        </>
    );
};

export default Layout;