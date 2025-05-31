require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const bcrypt = require('bcrypt');
const db = require('./db');

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use('/api', authRoutes);

app.post('/api/login', (req, res) => {

    const { email, password } = req.body;

    // Our sql query 
    const q = 'SELECT * FROM users WHERE email = ?';

    // We use our query
    db.query(q, [email], async (err, result) => {
        // If we get an error, we return a message
        if(err){
            console.error('DB error:', err);
            res.status(500).json({message: 'An error has occured while attempting login'});
        } 
        if(result.length === 0){
            res.status(401).json({message: 'Failed to login. Email or password is invalid'});
        }
        const user = result[0];
        //Checks if the hashed passwords matched
        const match = await bcrypt.compare(password, user.password);

        if(match){
            res.status(200).json({message: 'Login Successful!'});
        } else{
            res.status(401).json({message: 'Login Failed. Email or passowrd is invalid.'});
        }
    })
})

// Port our server is running on
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});