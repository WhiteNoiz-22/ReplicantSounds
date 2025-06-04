import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

function Register() {
  // Stores and sets our users email, initially empty string
  const [email, setEmail] = useState("");
  // Store and sets our users password, initially empty string
  const [password, setPassword] = useState("");
  // Stores and sets our user name, initially empty string
  const [username, setUsername] = useState("");
  // Stores and sets an error message if any
  const [error, setError] = useState("");
  // Our navigation hook
  const navigate = useNavigate();

  //Our letters
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Remvoes previous error message
      setError("");

      // Sends request to server
      const response = await axios.post("http://localhost:3000/api/signup", {
        username,
        email,
        password,
      });

      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.log("An error has occured" + error);
      setError("Invalid email or password.");
    }
  };


  
  return (
    <>
      <div className="log-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="log-card"
        >
          <h1>Sign-up</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="username"
                placeholder="Enter a username"
                onChange={(e) => setUsername(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="center-btn">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
            <Link to="/" className="link-color">
              Return to Login
            </Link>
            {error && <p>An error has occured: {error}</p>}
          </form>
        </motion.div>
      </div>
    </>
  );
}

export default Register;
