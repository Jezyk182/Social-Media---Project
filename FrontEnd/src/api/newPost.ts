import axios from "axios";


interface PostInputs {
    content: string
}

export const newPost = async (data: PostInputs) => {
            return await axios
            .post('/api/addPost', data, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            .then(res => {
                return res.data
            })
            .catch(err => {
                console.error("Error creating account: ", err);
                throw err
            });
        }