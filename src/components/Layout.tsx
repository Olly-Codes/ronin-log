import { Outlet, useNavigate } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAuth } from "../hooks/useAuth";

const Layout = () => {

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <>
            <header>
                <p>Ronin <span>Log</span></p>
                <Navbar />
                {user ? (<button onClick={logout}>Logout</button>) : (
                    <div>
                        <button onClick={() => navigate("/auth/login")}>Login</button>
                        <button onClick={() => navigate("/auth/register")}>Register</button>
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