import { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";


const FormSignUp = () => {

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        passwd: "",
        conPasswd: ""
    });
    
    const [signUpError, setError] = useState("")
    const navigate = useNavigate()

    function handleDataChange(e : any) {
        const value = e.target.value
        const name = e.target.name

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }


    axios.defaults.withCredentials = true

    async function handleSubmit(e : any) {
        console.log("submit start")
        e.preventDefault();
        const {passwd, conPasswd} = formData
        
        if(passwd === conPasswd) {
            setError("")
            try {
                await axios.post('http://localhost:3000/api/register', formData, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then(res => {
                    if(!res.data.success) {
                        setError(res.data.message)
                        setFormData({
                            username: "",
                            email: "",
                            passwd: "",
                            conPasswd: ""
                        });
                    } else {
                        return navigate("/login")
                    }
                });

                // Handle success
                console.log('Form data submitted successfully');
                console.log(formData)
                
            } catch (error) {
                // Handle error
                console.error('Error submitting form data:', error);
            }
        } else {
            setFormData((prev) => ({
                ...prev,
                passwd: "",
                conPasswd: ""
            }))

            setError("Passwords don't match!")
        }
    }


    const labelClass = "sad-my-1 sad-text-xl sad-py-1 sad-px-3 sad-rounded sad-text-gray-200 sad-w-full sad-bg-transparent sad-border-gray-500 sad-border sad-shadow-sm sad-shadow-gray-800"

    const inputs = [
        {name:"username", placeholder: "User123", desc:"Username", type: "text", value: formData.username},
        {name:"email", placeholder: "example@email.com", desc:"E-mail", type: "email", value: formData.email},
        {name:"passwd", placeholder: "••••••••", desc:"Password", type: "password", value: formData.passwd},
        {name:"conPasswd", placeholder: "••••••••", desc:"Confirm Password", type: "password", value: formData.conPasswd}
    ]

    return ( 
        <div className="sad-mx-auto sad-w-full">
            <form method="post" onSubmit={handleSubmit} className="sad-flex sad-flex-col">
                {inputs.map((input, id) => {
                    return (
                        <label htmlFor={input.name} key={id} className="sad-mb-8">
                            {input.desc}
                            <input type={input.type} value={input.value} placeholder={input.placeholder} name={input.name} onChange={handleDataChange} className={labelClass} required/>
                        </label>
                    )
                })}
                <button className="sad-my-1 sad-text-xl sad-py-1 sad-px-4 sad-rounded sad-text-gray-800 sad-w-fit sad-bg-blue-500 sad-font-bold" onClick={() => console.log("clicked!")}>Sign Up</button>
            </form>
            <p className="sad-text-red-600 sad-cursor-default sad-select-none" onDoubleClick={() => setError("")}>{signUpError}</p>
        </div>
     );
}
 
export default FormSignUp;