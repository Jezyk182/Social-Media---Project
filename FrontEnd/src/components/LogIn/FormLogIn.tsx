import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore";
import useUserInfo from "../../stores/useUserInfo";

const FormLogIn = () => {
    const [formData, setFormData] = useState({
        email: "",
        passwd: ""
    });
    const [LogInError, setError] = useState("");
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login); // Access the login function from the store
    const getInfo = useUserInfo((state) => state.getInfo)

    function handleDataChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    axios.defaults.withCredentials = true;

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");

        try {
            const res = await axios.post('http://localhost:3000/api/login', formData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            console.log(res.data)

            if (!res.data.success) {
                setFormData({
                    email: "",
                    passwd: ""
                });
                setError(res.data.message);
            } else {
                const userInfo = {
                    username: res.data.username,
                    email: res.data.email
                }
                const accessToken = res.data.accessToken
                localStorage.setItem("accessToken", accessToken)

                login(); // Log the user in
                getInfo(userInfo)
                navigate("/"); // Redirect to home
            }

            // Handle success
            console.log('Form data submitted successfully');
            console.log(`Is Logged In: ${useAuthStore.getState().isLoggedIn}`); // Access state directly
        } catch (error) {
            // Handle error
            console.error('Error submitting form data:', error);
            setError('Error submitting form data');
        }
    }

    const labelClass = "sad-my-1 sad-text-xl sad-py-1 sad-px-3 sad-rounded sad-text-gray-200 sad-w-full sad-bg-transparent sad-border-gray-500 sad-border sad-shadow-sm sad-shadow-gray-800";

    const inputs = [
        { name: "email", placeholder: "example@email.com", desc: "E-mail", type: "email", value: formData.email },
        { name: "passwd", placeholder: "••••••••", desc: "Password", type: "password", value: formData.passwd }
    ];

    return (
        <div className="sad-mx-auto sad-w-full">
            <form method="post" onSubmit={handleSubmit} className="sad-flex sad-flex-col">
                {inputs.map((input, id) => (
                    <label htmlFor={input.name} key={id} className="sad-mb-8">
                        {input.desc}
                        <input
                            type={input.type}
                            value={input.value}
                            placeholder={input.placeholder}
                            name={input.name}
                            onChange={handleDataChange}
                            className={labelClass}
                            required
                        />
                    </label>
                ))}
                <button type="submit" className="sad-my-1 sad-text-xl sad-py-1 sad-px-4 sad-rounded sad-text-gray-800 sad-w-fit sad-bg-blue-500 sad-font-bold">Log In</button>
            </form>
            {LogInError && <p className="sad-text-red-600 sad-cursor-default sad-select-none" onDoubleClick={() => setError("")}>{LogInError}</p>}
        </div>
    );
}

export default FormLogIn;




// import { useState } from "react";
// import axios from "axios"
// import { useNavigate } from "react-router-dom";
// import useAuthStore from "../../stores/useAuthStore";


// const FormLogIn = () => {

//     const [formData, setFormData] = useState({
//         email: "",
//         passwd: ""
//     });
    
//     const [LogInError, setError] = useState("")
//     const navigate = useNavigate()

//     function handleDataChange(e : any) {
//         const value = e.target.value
//         const name = e.target.name

//         setFormData((prev) => ({
//             ...prev,
//             [name]: value
//         }))
//     }

//     axios.defaults.withCredentials = true


//     const { login } = useAuthStore()


//     async function handleSubmit(e : any) {
//         e.preventDefault();
        
//         setError("")
//         try {
//             await axios.post('http://localhost:3000/api/login', formData, {
//                 headers: {
//                     "Content-Type": "application/json"
//                 }
//             })
//             .then(res => {
//                 if(!res.data.success) {
//                     setFormData({
//                         email: "",
//                         passwd: ""
//                     });
//                     setError(res.data.message)
//                 } else {
//                     navigate("/")
//                 }
//             });
//             // Handle success
//             console.log('Form data submitted successfully');
//             login()
//             const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
//             console.log(isLoggedIn)

//         } catch (error) {
//             // Handle error
//             console.error('Error submitting form data:', error);
//         }
//     }


//     const labelClass = "sad-my-1 sad-text-xl sad-py-1 sad-px-3 sad-rounded sad-text-gray-200 sad-w-full sad-bg-transparent sad-border-gray-500 sad-border sad-shadow-sm sad-shadow-gray-800"

//     const inputs = [
//         {name:"email", placeholder: "example@email.com", desc:"E-mail", type: "email", value: formData.email},
//         {name:"passwd", placeholder: "••••••••", desc:"Password", type: "password", value: formData.passwd},
//     ]

//     return ( 
//         <div className="sad-mx-auto sad-w-full">
//             <form method="post" onSubmit={handleSubmit} className="sad-flex sad-flex-col">
//                 {inputs.map((input, id) => {
//                     return (
//                         <label htmlFor={input.name} key={id} className="sad-mb-8">
//                             {input.desc}
//                             <input type={input.type} value={input.value} placeholder={input.placeholder} name={input.name} onChange={handleDataChange} className={labelClass} required/>
//                         </label>
//                     )
//                 })}
//                 <button className="sad-my-1 sad-text-xl sad-py-1 sad-px-4 sad-rounded sad-text-gray-800 sad-w-fit sad-bg-blue-500 sad-font-bold">Log In</button>
//             </form>
//             <p className="sad-text-red-600 sad-cursor-default sad-select-none" onDoubleClick={() => setError("")}>{LogInError}</p>
//         </div>
//      );
// }
 
// export default FormLogIn;