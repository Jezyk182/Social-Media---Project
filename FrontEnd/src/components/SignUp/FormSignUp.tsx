import { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import clsx from 'clsx'
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useMutation } from '@tanstack/react-query';
import { SignupData, signupUser } from "../../api/auth"; 

interface Inputs {
    username: string,
    email: string,
    passwd: string,
    conPasswd: string
}

const schema = z.object({
    username: z.string().nonempty("Username is required!"),
    email: z.string().nonempty("E-mail is required!").email("Incorrect e-mail!"),
    passwd: z.string().nonempty("Password is required!"),
    conPasswd: z.string().nonempty("Password is required!")
})


const FormSignUp = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<Inputs>({
        defaultValues: {
          username: "",
          email: "",
          passwd: "",
          conPasswd: "",
        },
        resolver: zodResolver(schema)
    })


    const [formData, setFormData] = useState({
        username: "",
        email: "",
        passwd: "",
        conPasswd: ""
    });
    
    const [signUpError, setError] = useState("")
    const navigate = useNavigate()


    const { data, error, isError, isSuccess, mutate } = useMutation({
        mutationFn: (data : SignupData) => signupUser(data),
        onSuccess: (data : any) => {
          if(data.success) {
            return navigate("/login")
          } else {
            setError(data.message)
            setFormData({
                username: "",
                email: "",
                passwd: "",
                conPasswd: ""
            });
            console.error('Error submitting form data:', error);
          }
        },
        onError: (error: any) => {
            setError(error)
            console.log(error)
            return error
        }
    })


    function handleDataChange(e : any) {
        const value = e.target.value
        const name = e.target.name

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }


    const onSubmit: SubmitHandler<Inputs> = (fData : SignupData) =>{
        const {passwd, conPasswd} = formData
        if(passwd === conPasswd) {
            setError("")
            mutate(fData)
        } else {
            setFormData((prev) => ({
                ...prev,
                passwd: "",
                conPasswd: ""
            }))

            setError("Passwords don't match!")
        }
    }


    const inputs = [
        {name:"username", placeholder: "User123", desc:"Username", type: "text", value: formData.username, error: errors.username?.message},
        {name:"email", placeholder: "example@email.com", desc:"E-mail", type: "email", value: formData.email, error: errors.email?.message},
        {name:"passwd", placeholder: "••••••••", desc:"Password", type: "password", value: formData.passwd, error: errors.passwd?.message},
        {name:"conPasswd", placeholder: "••••••••", desc:"Confirm Password", type: "password", value: formData.conPasswd, error: errors.conPasswd?.message}
    ]

    return ( 
        <div className="sad-mx-auto sad-min-w-96">
            <form method="post" onSubmit={handleSubmit(onSubmit)} className="sad-flex sad-flex-col">
                {inputs.map((input, id) => {
                    return (
                        <div className="sad-mb-4" key={ id }>
                            <label className="sad-text-lg sad-font-medium sad-text-black" >{ input.desc }</label>
                            <input
                                {...register(input.name as keyof Inputs)}
                                type={input.type}
                                placeholder={input.placeholder}
                                name={input.name}
                                value={input.value}
                                onChange={handleDataChange}
                                className={clsx(
                                    'sad-mt-1 sad-block sad-rounded-full sad-border-2 sad-border-gray-400 sad-py-2 sad-px-3 sad-text-lg sad-text-black sad-bg-white sad-w-full',
                                    'focus:sad-outline-none data-[focus]:sad-outline-offset-2 data-[focus]:sad-border-black'
                                )}
                            />
                            <p  className="sad-text-red-700">{ input.error }</p>
                        </div>
                    )
                })}
                <button type="submit" className="sad-my-6 sad-text-xl sad-py-3 sad-px-4 sad-rounded-full sad-text-white sad-w-full sad-bg-gray-800 sad-font-bold hover:sad-bg-black sad-duration-200" >
                    Sign Up
                </button>
            </form>
            <p className="sad-text-red-700 sad-cursor-default sad-select-none" onDoubleClick={() => setError("")}>{signUpError}</p>
        </div>
     );
}
 
export default FormSignUp;