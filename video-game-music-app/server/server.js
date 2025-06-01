require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const bcrypt = require('bcrypt');
const db = require('./db');
const jwt = require('jsonwebtoken');

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
            return res.status(500).json({message: 'An error has occured while attempting login'});
        } 
        if(result.length === 0){
            return res.status(401).json({message: 'Failed to login. Email or password is invalid'});
        }
        const user = result[0];
        //Checks if the hashed passwords matched
        const match = await bcrypt.compare(password, user.password);

        if(match){
            //Generates a jwt token upon sucess
            const token = jwt.sign({email: user.email}, process.env.JWT_SECRET);
            return res.json({success: true, token: token, message: 'Authentication Successful!', username: user.username});
        } else{
            //If our response is not authenticated
            return res.status(401).json({success: false, message: 'Login Failed. Email or password is invalid.'});
        }
    })
})

// Port our server is running on
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});