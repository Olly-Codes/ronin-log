import { Link, Outlet, useNavigate } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAuth } from "../hooks/useAuth";
import { MdMenu } from "react-icons/md";
import Sidebar from "./Sidebar";
import { useState } from "react";

const Layout = () => {

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [sidebarOpen, setSideBarOpen] = useState(false);

    return (
        <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
            <header className="h-16 bg-surface border-b border-border flex items-center justify-between lg:justify-around text-primary font-bold px-8 lg:px-0">
                <Link to="/">
                    <p className="text-xl">Ronin <span className="text-accent">Log</span></p>
                </Link>
                <div className="hidden lg:block">
                    <Navbar />
                </div>
                <div className="lg:hidden">
                    <Sidebar isOpen={sidebarOpen} onClose={() => setSideBarOpen(false)} />
                </div>
                {user ? (
                    <div className="flex items-center gap-4">
                        <p className="hidden lg:block">{user.username}</p>
                        <button 
                            onClick={logout}
                            className="hidden lg:block px-2 cursor-pointer bg-red-600 py-2 hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="hidden lg:flex flex items-center gap-4">
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
                <button
                    className="lg:hidden text-primary text-2xl"
                >
                    <MdMenu onClick={() => setSideBarOpen(true)} />
                </button>
            </header>

            <Outlet />

            <footer className="h-16 bg-surface border-t border-border flex items-center justify-around text-primary font-bold">
                <Footer />
            </footer>
        </div>
    );
};

export default Layout;