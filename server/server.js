// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// CORS configuration to allow requests from specific domain
const corsOptions = {
  origin: 'https://registerform-ue9n.vercel.app',  // Specify the frontend URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type',"Access-Control-Allow-Methods", "Access-Control-Request-Headers"],
  credentials: true,  // Optional: if you need cookies or authorization headers
};

app.use(cors(corsOptions)); // Apply the CORS middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://meemmateen:meemmateen@cluster0.sx3id.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define User schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// POST route for user registration
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(200).send('User registered successfully');
  } catch (error) {
    res.status(500).send('Error registering user');
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
