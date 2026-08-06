import { Link } from "react-router";

const Footer = () => {

    const links = [
        { to: "/", label: "Home" },
        { to: "/reviews", label: "Reviews" },
        { to: "/about", label: "About" },
    ];

    return (
        <>
            <p>Ronin Log</p>
            <ul>
                {links.map((link) => (
                    <Link 
                        key={link.to}
                        to={link.to}
                    >
                        {link.label}
                    </Link>
                ))}
            </ul>
            <p>&copy; 2026 Olly Codes</p>
        </>
    );
};

export default Footer;