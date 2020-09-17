const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const {jwtkey} = require('../keys')
const router = express.Router();
const User = mongoose.model('User');
const assert = require('assert');
require("mongoose-type-email");
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/signup',async (req,res)=>{

    const {email,password,fName,lName,age,userName} = req.body;
    // console.log(req.body);

    try{
      const user = new User({email,password,fName,lName,age,userName});
      await  user.save();
      //Creating token on the basis of Id.
      const token = jwt.sign({userId:user._id},jwtkey);
      // console.log(token);
      res.send(JSON.stringify({
        message: "User has been successfully registered!",
        token,
        success : true
      }));

    } catch(err){
      console.log(err);
      //If this is the error, u need to redirect it to sign-up page again.
      //if uniqueness is not rendered.
      if(err.code === 11000){
        // console.log(Object.keys(err.keyValue));
        if((Object.keys(err.keyValue)[0]) === "userName"){
          res.status(422).send(JSON.stringify({
            success: false,
            message: "Entered username is already in use!"
          }));
        }
        if((Object.keys(err.keyValue)[0]) === "email"){
          res.status(422).send(JSON.stringify({
            success: false,
            message: "Entered email is already in use!"
          }));
        } else{
          res.status(422).send(JSON.stringify({
            success: false,
            message: err.message
          }));
        }
      }
      //if requiredness is not fulfilled.
      var variable = "xyz";
      variable = Object.keys(err.errors)[0];
      if(variable !== "xyz"){

        if(variable === "userName"){
          variable = "Username";
        } else if(variable === "fName"){
          variable = "First name";
        } else if(variable === "lName"){
          variable = "Last name";
        } else if(variable === "age"){
          variable = "Age";
        } else if(variable === "email"){
          variable = "Email";
        } else if(variable === "password"){
          variable = "Password";
        }

        return res.status(422).send(JSON.stringify({
          success : false,
          message: variable + " field is required!",
          //err
        }));
      }

      else{
        return res.status(422).send({
          success : false,
          message: err
        });
      }
    }
});

router.post('/login',async (req,res)=>{
    const {userName,password} = req.body
    if(!userName || !password){
        return res.status(422).send(JSON.stringify({
          success : false,
          message : "Must provide username and password!"
        }));
    }
    const user = await User.findOne({userName});
    if(!user){
        return res.status(422).send(JSON.stringify({
          success : false,
          message : "Incorrect username or password!!"
        }));
    }
    try{
      await user.comparePassword(password);
      const token = jwt.sign({userId:user._id},jwtkey);
      res.send(JSON.stringify({
        message: "Successfully logged in!",
        token,
        fName: user.fName,
        lName: user.lName,
        age: user.age,
        email: user.email,
        success : true
      }));
    }catch(err){
        return res.status(422).send(JSON.stringify({
          success : false,
          message : "Incorrect username or password!"
        }));
    }
});

router.patch("/resetPassword", async (req,res)=>{
  const {userName, prevPass, newPass} = req.body;
  if(!userName || !prevPass || !newPass){
      return res.status(422).send(JSON.stringify({
        success : false,
        message : "Must provide old password, and new password!"
      }));
  }

  const user = await User.findOne({userName})
  console.log(user);
  if(!user){
      return res.status(422).send(JSON.stringify({
        success : false,
        message : "Incorrect username or password!!"
      }));
  }
  try{
    await user.comparePassword(prevPass);
    bcrypt.hash(newPass, saltRounds, function(err, hash) {
       User.updateOne(
        {userName: userName},
        {$set: {password: hash}},

        function(err){
          console.log(err);
          if(!err){
            res.send(JSON.stringify({
              message: "Password has been successfully reset!",
              success : true
            }));
          } else{
            res.send(JSON.stringify({
              success: false,
              message: "No user found!"
            }));
          }
        }
      )
    });
  }catch(err){
      return res.status(422).send(JSON.stringify({
        success : false,
        message : "Incorrect username or password!"
      }));
  }
});

router.patch("/saveProfile", async (req,res)=>{
  User.updateOne(
    {userName: req.body.userName},
    {$set: req.body},

    function(err) {
      console.log(err);
      if (!err) {
        res.send(JSON.stringify({
          message: "Profile successfully updated!",
          success: true
        }));
      } else {
        res.send(JSON.stringify({
          success: false,
          message: "No user found!"
        }));
      }
    }
  )
});

module.exports = router;