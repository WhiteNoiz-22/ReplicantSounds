require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const libraryRoutes = require('./routes/libraryRoutes');
const loginRoutes = require('./routes/loginRoutes');
const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));


app.use('/api', authRoutes);
app.use('/api', libraryRoutes);
app.use('/api', loginRoutes);

// Port our server is running on
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});