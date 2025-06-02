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
            const token = jwt.sign({email: user.email, user_id: user.id}, process.env.JWT_SECRET);
            return res.json({success: true, token: token, message: 'Authentication Successful!', username: user.username});
        } else{
            //If our response is not authenticated
            return res.status(401).json({success: false, message: 'Login Failed. Email or password is invalid.'});
        }
    })
})

// This should add our soundtracks to our users library
app.post("/api/soundtracks", (req, res) => {
    const q = "INSERT INTO library (`user_id`, `game_id`, `gamename`) VALUES(?, ?, ?)";
    const {user_id, game_id, gamename} = req.body;
    db.query(q, [user_id, game_id, gamename], (error, result) => {
        if(error){
            console.error('Backend error: ', error);
            return res.status(500).json({message: 'Could not add game to library'});
        }
        return res.status(200).json({message: "Game has been successfully added!"});
    });
});


// This will get all our library games for the logged in user
app.get("/api/library/:user_id", (req, res) => {
    const {user_id} = req.params;
    const q = "SELECT * FROM library WHERE user_id = ?";
    db.query(q, [user_id], (error, results) => {
        if(error){
            console.error('Error while getting user library games: ', error);
            return res.status(500).json({message: 'Could not fetch user library'});
        }
        return res.status(200).json(results);
    });
});


// Port our server is running on
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});