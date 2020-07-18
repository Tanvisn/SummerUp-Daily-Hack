//jshint esversion:6
// require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {mongoUrl} = require("./keys");
const app = express();

mongoose.set('useCreateIndex', true);
mongoose.connect(mongoUrl,  { useUnifiedTopology: true,  useNewUrlParser: true } );

require("./models/User");
const requireToken = require("./middleware/requireTokens");

const authRoutes = require("./routes/authRoutes");

app.use(bodyParser.json());
app.use(authRoutes);

mongoose.connection.on("connected", ()=>{
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err)=>{
  console.log("This is error", err);
});

app.get("/", requireToken, (req,res)=>{
  res.send("Your email is  " + req.user.email);
});

app.listen(9000, function() {
  console.log("Server started on port 9000.");
});
