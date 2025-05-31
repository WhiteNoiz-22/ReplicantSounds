require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');


//Our db conenction
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
})

const app = express();

app.use(express.json());
app.use(cors());

app.post('/login', (req, res) => {

    const { email, password} = req.body;

    // Our sql query 
    const q = 'SELECT * FROM users WHERE email = ? AND password = ?';

    // We use our query
    db.query(q, [email, password], (err, result) => {
        // If we get an error, we return a message
        if(err){
            console.error('DB error:', err);
            res.status(500).json({message: 'An error has occured while attempting login'});
        } else{
            if(result.length > 0){
                res.status(200).json({message: 'Login Successful!'})
            } else{
                res.status(401).json({message: 'Failed Login. Username or password is not valid.'})
            }
        }
    })
})

// Port our server is running on
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});