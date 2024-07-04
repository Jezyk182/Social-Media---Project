import FormSignUp from "./FormSignUp";
import { Link } from "react-router-dom";
import Logo from "../../Logo";

const SignUp = () => {
    return ( 
        <div className="sad-bg-[url('/public/login.jpg')] sad-h-screen sad-w-1/2">
            <div className="sad-absolute sad-right-0 sad-h-full sad-w-1/2 sad-bg-white sad-p-10 sad-pt-4 sad-text-black">
                <div className="sad-w-3/4 sad-mx-auto">
                    <Logo w={128} h={128}/>
                    <h1 className="sad-text-3xl sad-mb-6 sad-font-bold">Sign Up</h1>
                    <p>Register for new crazy stories!</p>
                    <FormSignUp />
                    <p className="sad-mt-0">
                        Already have an account? <Link to="/login" className="sad-text-black sad-underline hover:sad-text-slate-500 sad-duration-200 sad-ease-out">Log In!</Link>
                    </p>
                </div>
            </div>
        </div>
     );
}
 
export default SignUp;