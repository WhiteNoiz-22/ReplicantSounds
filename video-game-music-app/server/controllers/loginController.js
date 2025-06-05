const db = require("../db");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.loginUser = (req, res) => {

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
            const token = jwt.sign({email: user.email, user_id: user.id}, process.env.JWT_SECRET);
            return res.json({success: true, token: token, message: 'Authentication Successful!', username: user.username});
        } else{
            //If our response is not authenticated
            return res.status(401).json({success: false, message: 'Login Failed. Email or password is invalid.'});
        }
    })
}