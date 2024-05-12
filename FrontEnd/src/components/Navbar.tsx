import { Link } from "react-router-dom";

const Navbar = () => {

    const links = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" }
    ]

    const userLinks = [
        { name: "Log In", path: "/login" },
        { name: "Sign Up", path: "/signup" }
    ]

    return (
        <nav className="sad-container sad-m-auto sad-flex sad-justify-between sad-text-2xl sad-py-2">
            <div>
                {links.map((link, id) => {
                    return (
                        <Link 
                            to={link.path} 
                            key={id}
                            className="sad-mx-5 sad-text-slate-400 sad-duration-200 sad-ease-out hover:sad-text-slate-50">
                                {link.name}
                        </Link>
                    )
                })}
            </div>
            <div>
                {userLinks.map((link, id) => {
                    return (
                        <Link 
                            to={link.path} 
                            key={id}
                            className="sad-mx-5 sad-text-slate-400 sad-duration-200 sad-ease-out hover:sad-text-slate-50">
                                {link.name}
                        </Link>
                    )
                })}
            </div>

            
        </nav>
    )
}

export default Navbar