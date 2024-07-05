import { Link } from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore";
import LogIn from "./LogIn";
import UserInfo from "./UserInfo";

const Navbar = () => {

    const links = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contact" },
        { name: "Add Post", path: "/add"}
    ]

    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    console.log(isLoggedIn)


    return (
        <nav className="sad-container sad-m-auto sad-flex sad-justify-between sad-items-center sad-text-2xl sad-py-2 sad-border-b sad-border-text">
            <div>
                {links.map((link, id) => {
                    return (
                        <Link 
                            to={link.path} 
                            key={id}
                            className="sad-mx-5 sad-text-slate-400 sad-duration-200 sad-ease-out hover:sad-text-textAcc">
                                {link.name}
                        </Link>
                    )
                })}
            </div>
            <div>
                {isLoggedIn ? <UserInfo /> : <LogIn />}
            </div>
        </nav>
    )
}

export default Navbar