import { useState } from "react";
import axios from "axios"


const Form = () => {

    const [formData, setFormData] = useState({
        fName: "",
        lName: "",
        username: "",
        age: "",
        email: "",
        passwd: "",
        conPasswd: ""
    });
    
    const [signUpError, setError] = useState("")



    function handleDataChange(e : any) {
        const value = e.target.value
        const name = e.target.name

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }


    async function handleSubmit(e : any) {
        e.preventDefault();
        const {passwd, conPasswd} = formData
        
        if(passwd === conPasswd) {
            setError("")
            try {
                await axios.post('http://localhost:3000/api/submit-form', formData, {
                    headers: {
                        "Content-Type": "application/json"
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


    const labelClass = "sad-my-1 sad-mx-5 sad-text-xl sad-py-1 sad-px-3 sad-rounded sad-text-gray-800 sad-w-64"

    const inputs = [
        {name:"fName", placeholder: "First Name", type: "text", value: formData.fName},
        {name:"lName", placeholder: "Last Name", type: "text", value: formData.lName},
        {name:"username", placeholder: "Username", type: "text", value: formData.username},
        {name:"age", placeholder: "Age", type: "number", value: formData.age},
        {name:"email", placeholder: "E-mail", type: "email", value: formData.email},
        {name:"passwd", placeholder: "Password", type: "password", value: formData.passwd},
        {name:"conPasswd", placeholder: "Confirm Password", type: "password", value: formData.conPasswd}
    ]

    return ( 
        <>
            <form method="post" onSubmit={handleSubmit} className="sad-flex sad-flex-col">
                {inputs.map((input, id) => {
                    return (
                        <label htmlFor={input.name} key={id}>
                            <input type={input.type} value={input.value} placeholder={input.placeholder} name={input.name} onChange={handleDataChange} className={labelClass} required/>
                        </label>
                    )
                })}
                <button className={`${labelClass} sad-bg-white`}>Sign Up</button>
            </form>
            <p className="sad-text-red-600">{signUpError}</p>
        </>
     );
}
 
export default Form;