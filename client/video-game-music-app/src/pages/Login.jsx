import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

function Login(props){

    // Stores and sets our users email, initially empty string
    const [email, setEmail] = useState('');
    // Store and sets our users password, initially empty string
    const [password, setPassword] = useState('');
    // Stores and sets an error message if any
    const [error, setError] = useState('');

    // Our navigation hook
    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();

        try{
            // Remvoes previous error message
            setError('');

            // Sends request to server
            const response = await axios.post('http://localhost:3000/login', {email, password});

            if(response.status === 200){
                navigate('/home');
            }

        }catch(error){
            console.log('An error has occured' + error)
            setError("Invalid email or password.")
        }
    }
    

    return(
        <>
        <h1>Login</h1>
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder="Enter Email" onChange={e => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Enter Password" onChange={e => setPassword(e.target.value)}/>

                </div>
                <button type="submit">Login</button>
                {error && <p>An error has occured: {error}</p>}
            </form>
        </div>
        </>
    )
}

export default Login;