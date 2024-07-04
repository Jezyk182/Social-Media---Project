import axios from "axios"


//! vvv LOGIN FUNCTION vvv !//

export interface LoginData {
    email: string;
    passwd: string;
}

export const loginUser = async (data: LoginData) => {
    return await axios
    .post('/api/login', data)
    .then(res => {
        console.log("Login response: ", res.data);
        return res.data;
    })
    .catch(error => {
        console.error("Error logging user:", error);
        throw error;
    });
}


//! vvv SIGNUP FUNCTION vvv !//

export interface SignupData {
    username: string,
    email: string,
    passwd: string,
    conPasswd: string
}


export const signupUser = async (data : SignupData) => {
    return await axios
    .post('/api/register', data)
    .then(res => {
        return res.data
    })
    .catch(error => {
        console.error("Error creating account: ", error);
        throw error;
    });
}