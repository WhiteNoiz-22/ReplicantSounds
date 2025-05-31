import { useState } from "react";
import { useNavigate, Link } from "react-router";
import axios from "axios";
import '../styles/Login.css';

function Login(){

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
            const response = await axios.post('http://localhost:3000/api/login', {email, password});

            // If we have a positive response, we navigate to homepage
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
        <div className="my-form">
        <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" placeholder="Enter Email" onChange={e => setEmail(e.target.value)} className="form-control"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" placeholder="Enter Password" onChange={e => setPassword(e.target.value)} className="form-control"/>

                </div>
                <button type="submit" className="btn btn-primary">Login</button>
                <Link className="btn btn-default" to="/signup">Register Here</Link>
                {error && <p>An error has occured: {error}</p>}
            </form>
        </div>
        </>
    )
}

export default Login;