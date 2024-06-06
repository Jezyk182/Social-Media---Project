import { Link } from "react-router-dom";

const LogIn = () => {

    const userLinks = [
        { name: "Log In", path: "/login" },
        { name: "Sign Up", path: "/signup" }
    ]


    return ( 
        <>
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
        </>
     );
}
 
export default LogIn;