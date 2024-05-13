import FormLogIn from "./FormLogIn";
import { Link } from "react-router-dom";

const LogIn = () => {
    return ( 
        <div className="sad-mx-auto sad-bg-opacity-40 sad-backdrop-blur-sm sad-bg-slate-600 sad-w-fit sad-p-10 sad-rounded-xl sad-mt-40  sad-shadow-2xl sad-shadow-black">
            <h1 className="sad-text-3xl sad-mb-6 sad-font-bold">Log In</h1>
            <FormLogIn />
            <p className="sad-mt-6">
                Don't have an account? <Link to="/signup" className="sad-text-sky-500 sad-underline hover:sad-text-sky-300 sad-duration-200 sad-ease-out">Register Now!</Link>
            </p>
        </div>
     );
}
 
export default LogIn;