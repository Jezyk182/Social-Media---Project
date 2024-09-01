import { Link } from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore";
import LogIn from "./LogIn";
import UserInfo from "./UserInfo";
import HomeIcon  from "../../icons/home";
import AboutIcon from "../../icons/about";
import AddIcon from "../../icons/add";
import SearchIcon from "../../icons/search";

const Navbar = () => {

    const links = [
        { name: "Home", path: "/", icon: <HomeIcon /> },
        { name: "About", path: "/about", icon: <AboutIcon /> },
        { name: "Search", path: "/search", icon: <SearchIcon /> },
        { name: "Add Post", path: "/add", icon: <AddIcon /> }
    ]

    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    console.log(isLoggedIn)


    return (
        <nav className="sad-w-fit sad-h-full sad-m-auto sad-flex sad-flex-col sad-gap-4 sad-justify-start sad-items-center sad-text-2xl sad-py-2  sad-border-text sad-bg-secbg sad-absolute sad-top-0 sad-z-50">
            <div>
                {isLoggedIn ? <UserInfo /> : <LogIn />}
            </div>
            <span className="sad-block sad-w-3/4 sad-h-px sad-bg-text sad-my-2"></span>
            <div className="sad-flex sad-flex-col sad-gap-6">
                {links.map((link, id) => {
                    return (
                        <Link 
                            to={link.path} 
                            key={id}
                            className="sad-mx-5 sad-text-text sad-duration-200 sad-ease-out hover:sad-text-textAcc">
                                {link.icon}
                            </Link>
                    )
                })}
            </div>
        </nav>
    )
}

export default Navbar