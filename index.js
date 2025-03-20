const express = require('express');
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
require("dotenv").config()
const User = require("./model/schema")

const app = express();
const port = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL


app.use(express.json());

mongoose.connect(MONGO_URL)
  .then(()=>console.log("Successfully Connected to DB"))
  .catch(()=>console.log("Error connecting to DB"))

  app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    if (![username, email, password].every(Boolean)) 
      return res.status(400).json({ success: false, message: "All fields are required" });
  
    try {
      await new User({ username, email, password: await bcrypt.hash(password, 10) }).save();
      res.status(201).json({ success: true, message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error registering user", error: error.message });
    }
  });
   
app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});