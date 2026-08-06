import { NavLink } from "react-router";

const Navbar = () => {

    const links = [
        { to: "/reviews", label: "Reviews" },
        { to: "/about", label: "About" },
    ];

    return (
        <nav className="flex items-center gap-4">
            {links.map((link) => (
                <NavLink 
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) => `py-2 px-2 ${isActive ? "border-b border-red-600" : "text-muted hover:text-accent"}`}
                >
                    {link.label}
                </NavLink>
            ))}
        </nav>
    );
};

export default Navbar;