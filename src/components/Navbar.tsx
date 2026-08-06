import { NavLink } from "react-router";

const Navbar = () => {

    const links = [
        { to: "/", label: "Home" },
        { to: "/reviews", label: "Reviews" },
        { to: "/about", label: "About" },
    ];

    return (
        <nav>
            {links.map((link) => (
                <NavLink 
                    key={link.to}
                    to={link.to}
                >
                    {link.label}
                </NavLink>
            ))}
        </nav>
    );
};

export default Navbar;