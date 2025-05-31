const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db'); // or wherever your db connection is

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const q = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    db.query(q, [username, email, hashedPassword], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error creating user' });
      }
      res.status(200).json({ message: 'User created successfully' });
    });
  } catch (err) {
    res.status(500).json({ message: 'Error hashing password' });
  }
});

module.exports = router;