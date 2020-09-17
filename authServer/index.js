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
const confirm = require("./routes/confirm");
const authroutes_ = require("./routes/authroutes_.js");
const expense = require("./routes/expense");
const fitness = require("./routes/fitness");
const diary = require("./routes/diary");
const shop_ = require("./routes/shop_");
const events = require("./routes/events");
const medical = require("./routes/medical");
const notif = require("./routes/notif.js");
const notes = require("./routes/notes.js");
const fd = require("./routes/feedback.js");

app.use(bodyParser.json());

app.use(authroutes_);
app.use(expense);
app.use(fitness);
app.use(diary);
app.use(shop_);
app.use(events);
app.use(medical);
app.use(notif);
app.use(notes);
app.use(confirm);
app.use(fd);

mongoose.connection.on("connected", ()=>{
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err)=>{
  console.log("This is error:", err);
});

app.get("/", requireToken, (req,res)=>{
  res.send(req.user);
});

app.listen(9000, function() {
  console.log("Server started on port 9000.");
});
