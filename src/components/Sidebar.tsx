import { MdClose } from "react-icons/md";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Sidebar = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {

    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const links = [
        { to: "/reviews", label: "Reviews" },
        { to: "/about", label: "About" },
    ];

    return (
        <>
            {isOpen && (
                <div
                    onClick={onClose}
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                >
                    <aside className={`fixed lg:hidden inset-y-0 left-0 z-50 w-3/4 sm:w-80 md:w-96 max-w-sm bg-surface border-r border-border flex flex-col transform transition-transform duration-300 ${
                        isOpen ? "translate-x-0" : "translate-x-full"}`}>
                            <section>
                                <div className="px-6 py-6 flex items-center justify-between">
                                    <h1 className="text-xl font-bold text-primary">
                                        Ronin <span className="text-accent">Log</span>
                                    </h1>
                                    <button
                                        onClick={onClose}
                                        className="lg:hidden text-muted hover:text-primary text-2xl"
                                    >
                                        <MdClose />
                                    </button>
                                </div>

                                <nav className="flex flex-col p-4 gap-1">
                                    {links.map((link) => (
                                        <NavLink
                                            key={link.to}
                                            to={link.to}
                                            onClick={onClose}
                                            className={({ isActive }) => `self-start py-2 px-2 ${isActive ? "border-b border-red-600" : "text-muted hover:text-accent"}`}
                                        >
                                            {link.label}
                                        </NavLink>
                                    ))}
                                    {user ? (
                                        <button 
                                            onClick={logout}
                                            className="mt-4 px-2 cursor-pointer bg-red-600 py-2 hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
                                        >
                                            Logout
                                        </button>
                                    ) : (
                                        <div className="flex flex-col gap-4 mt-4">
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
                                </nav>
                                
                            </section>
                        </aside>
                </div>
            )}
        </>
        
        
    );
};

export default Sidebar;