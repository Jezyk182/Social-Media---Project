import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {

    const [name, setName] = useState("")

    axios.defaults.withCredentials = true

    useEffect(() => {
        axios.get("http://localhost:3000/api")
        .then(res => {
            if(res.data.success) {
                setName(res.data.username)
            }
        })
        .catch(err => console.log(err))
    })


    return ( 
        <div>
            <h1 className="sad-text-white">HOME</h1>
            <h1 className="sad-text-white">{name.length > 0 && `Welcome ${name}`}</h1>
        </div>
     );
}
 
export default Home;