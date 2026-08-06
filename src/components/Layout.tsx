import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
    return (
        <>
            <header>
                <p>Ronin <span>Log</span></p>
                <Navbar />
                <button>Login</button>
            </header>

            <Outlet />

            <footer>
                <Footer />
            </footer>
        </>
    );
};

export default Layout;