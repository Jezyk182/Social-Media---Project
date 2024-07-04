// import axios from "axios"



// axios.defaults.withCredentials = true;

// const onSubmit: SubmitHandler<Inputs> = async (data : object, e : any) =>{
//     e?.preventDefault()
//     setError("");

//     try {
//         const res = await axios.post('/api/login', data);

//         console.log(res.data)

//         if (!res.data.success) {
//             setFormData({
//                 email: "",
//                 passwd: ""
//             });
//             setError(res.data.message);
//         } else {
//             const userInfo = {
//                 username: res.data.username,
//                 email: res.data.email
//             }
//             const accessToken = res.data.accessToken
//             localStorage.setItem("accessToken", accessToken)

//             login(); // Log the user in
//             getInfo(userInfo)
//             navigate("/"); // Redirect to home
//         }

//         // Handle success
//         console.log('Form data submitted successfully');
//         console.log(`Is Logged In: ${useAuthStore.getState().isLoggedIn}`); // Access state directly
//     } catch (error) {
//         // Handle error
//         console.error('Error submitting form data:', error);
//         setError('Error submitting form data');
//     }
// }