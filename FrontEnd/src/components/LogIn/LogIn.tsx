import FormLogIn from "./FormLogIn";
import { Link } from "react-router-dom";
import Logo from "../../Logo";
import "../../../tailwind.config.js"

const LogIn = () => {
    return ( 
        <div className="sad-bg-[url('/public/login.jpg')] sad-h-screen sad-w-1/2">
            <div className="sad-absolute sad-right-0 sad-h-full sad-w-1/2 sad-p-10 sad-pt-4 sad-bg-white sad-text-bg">
                <div className="sad-w-3/4 sad-mx-auto">
                    <Logo w={128} h={128}/>
                    <h1 className="sad-text-3xl sad-mb-6 sad-font-bold sad-mt-6">Log In</h1>
                    <p>Enter your email and password to log in and explore posts!</p>
                    <FormLogIn />
                    <p className="sad-mt-0">
                        Don't have an account? <Link to="/signup" className="sad-text-black sad-underline hover:sad-text-slate-500 sad-duration-200 sad-ease-out">Register Now!</Link>
                    </p>
                </div>
            </div>
        </div>
     );
}
 
export default LogIn;