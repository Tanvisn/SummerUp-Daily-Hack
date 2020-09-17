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


router.post("/getAllExpenseEntries" , (req , res , next) => {

  const username = req.body.name;
  const date = req.body.date;
console.log(username);
console.log(date);
  var count = 0;
  var message = "Something went wrong!";
  var valid = false;

  User.aggregate(
    [{$match:{"userName":username}},
    {$project: { "expense":{$filter:{input: "$expense", as:"exp",cond:{$eq:["$$exp.date",date]}}}}}] , (err , res_1) => {
    if(!err)
    {
      valid = true;
      count = res_1.length;
      if((res_1[0] === null)||(count === 0)||(res_1[0].expense.length === 0))
      {
        message = "No entries yet!";
        res_1 = [];
      }
      else
      {
        message = "Successfully fetched!";
      }
      res.send(JSON.stringify({
        success : valid,
        message : message,
        number : count,
        content : res_1
      }));

    }
    else
    {
      res.send(JSON.stringify({
        success : valid,
        message : message,
        number : count,
        content : []
      }));
    }
  });
});

router.post("/getMonthlyExpenses" , (req , res , next) => {

  const username = req.body.name;
  const type = req.body.type;
  var count = 0;
  var message = "Something went wrong!";
  var valid = false;

  User.aggregate([
    {$match : 
      {"userName" : username , "expense.contents.type" : {$in:["expenses","income"]}}} , 
    {$unwind : "$expense"} , 
    {$unwind : "$expense.contents"} , 
    {$group : {_id : { "month" : "$expense.month", "type":"$expense.contents.type"} , 
              "amt" : {$sum : "$expense.contents.cost"}}}
    ] , (err , res_1) => {
    if(!err)
    {
      valid = true;
      count = res_1.length;
      if((res_1[0] === null)||(count === 0))
      {
        message = "No entries yet!";
        res_1 = [];
      }
      else
      {
        message = "Successfully fetched!";
      }
      res.send(JSON.stringify({
        success : valid,
        message : message,
        number : count,
        content : res_1
      }));

    }
    else
    {
      res.send(JSON.stringify({
        success : valid,
        message : message,
        number : count,
        content : []
      }));
    }
  });
});

router.post("/getPieChart" , (req , res , next) => {

  const username = req.body.name;
  const month = req.body.month;

  var count = 0;
  var message = "Something went wrong!";
  var valid = false;
  var fuelFlag=0;var mediFlag=0;var otheFlag=0;var restFlag=0;var shopFlag=0;var travFlag=0;

  User.aggregate([{$match : {"userName" : username , "expense.contents.type" : "expenses" , "expense.month" : month}} , {$unwind : "$expense"} , {$unwind : "$expense.contents"} , {$group : {_id : { "purpose" : "$expense.contents.purpose" , "month" : "$expense.month", "type":"$expense.contents.type"} , "expenses" : {$sum : "$expense.contents.cost"}}}] , (err , res_1) => {
    if(!err)
    {
      valid = true;
      count = res_1.length;
      if((res_1[0] === null)||(count === 0))
      {
        message = "No entries yet!";
        res_1 = [];
      }
      else
      {
        message = "Successfully fetched!";
        for(let i=0 ; i<count ; i++)
        {
          if(res_1[i]._id.purpose === "Shopping")
          {
            shopFlag = 1;
          }
          if(res_1[i]._id.purpose === "Restaurant")
                                        {
                                                restFlag = 1;
                                        }
          if(res_1[i]._id.purpose === "Fuel")
                                        {
                                                fuelFlag = 1;
                                        }
          if(res_1[i]._id.purpose === "Medical")
                                        {
                                                mediFlag = 1;
                                        }
          if(res_1[i]._id.purpose === "Travel")
                                        {
                                                travFlag = 1;
                                        }
          if(res_1[i]._id.purpose === "Others")
                                        {
                                                otheFlag = 1;
                                        }
        }
        if(shopFlag === 0)
        {
          res_1.push({"_id" : {"purpose" : "Shopping"} , "expenses" : 0});
        }
        if(restFlag === 0)
                                {
                                        res_1.push({"_id" : {"purpose" : "Restaurant"} , "expenses" : 0});
                                }
        if(fuelFlag === 0)
                                {
                                        res_1.push({"_id" : {"purpose" : "Fuel"} , "expenses" : 0});
                                }
        if(mediFlag === 0)
                                {
                                        res_1.push({"_id" : {"purpose" : "Medical"} , "expenses" : 0});
                                }
        if(travFlag === 0)
                                {
                                        res_1.push({"_id" : {"purpose" : "Travel"} , "expenses" : 0});
                                }
        if(otheFlag === 0)
                                {
                                        res_1.push({"_id" : {"purpose" : "Others"} , "expenses" : 0});
                                }
      }
      res.send(JSON.stringify({
        success : valid,
        message : message,
        number : count,
        content : res_1
      }));

    }
    else
    {
      res.send(JSON.stringify({
        success : valid,
        message : message,
        number : count,
        content : []
      }));
    }
  });
});

router.post("/expensesUpdate" , (req , res , next) => {
  var username = req.body.name;
  var edit = req.body.edit;
  //if edit is 1, add the cost to the existing savings, if it is 2, add the cost to the exisiting expenses, if it is 3 delete the given savings , 4 delete expense
  var cost = req.body.cost;//common, if the date isnt found make a date like that and add, else add or subtract this cost depending on edit value
  var date = req.body.date;//in the format "dd-mm-yyyy", no space, onli hyphen and in this format coz it makes the difference in expenses all file
  var purpose = req.body.pur;//purpose for sending or receiving money
  var newPurpose = req.body.newPur;//new purpose, onli when he needs to modify the purpose , if he doesnt change send null
  var description = req.body.desc;//description , send null if ntg is there
  var newDescription = req.body.newDesc;//new description, only when he needs to modify the description , if he doesnt change send null
  var time = req.body.time;//time
  var newTime = req.body.newTime;//new time , only when he needs to modify the time , if he doesnt change send null
  var key = req.body.key;
  var method = req.body.mode;

  var type;
  var message = "Something went wrong!";
  var valid = false;
  var flag = 0;
  var flag1 = 0;

  if(edit === 1)
  {
    //savings
    if(purpose === null)
    {
      purpose = "savings";
    }
    type = "income";
  }
  else if(edit === 2)
  {
    //expenses
    if(purpose === null)
    {
      purpose = "expenses";
    }
    type = "expenses";
  }
  else if(edit === 3)
  {
    //delete savings
    flag = 3;
    type = "income";
  }
  else
  {
    //delete expense
    flag = 3;
    type = "expenses";
  }

  var idkey = type+purpose+description;

  if((edit === 1)||(edit === 2))
  {
    User.find({"userName" : username , "expense.date" : date} , {"expense" : 1} , (err , res_1) => {
    if(!err)
    {
      if((res_1.length === 0)||(res_1[0] === null))
      {
        //missing, have to insert
        flag = 1;
      }
      else
      {
        //found, have to update
        flag = 2;
      }
    }
    if(flag === 0)
    {
      //error
      res.send(JSON.stringify({
        success : valid,
        message : message
      }));
    }
    else if(flag === 1)
    {
      //insert
      var month = date.slice(3);
      User.updateOne(
        {"userName" : username} , 
        {$push : {"expense" : 
          {_id : date , "date" : date , "month" : month , "contents" : 
              [{_id : key , "key" : key , "type" : type , "cost" : cost , "purpose" : purpose , "description" : description , "time" : time, "method":method}]}}} , (err) => {
        if(!err)
        {
          valid = true;
          message = "Changes saved successfully!";
        }
        console.log(err);
        res.send(JSON.stringify({
          success : valid,
          message : message
        }));
      });
    }
    else if(flag === 2)
    {
      //update
      var present;
      var pUrpose;
      var desc;
      var tIme;
      var flag1 = 0;

      User.find({"userName" : username , "expense.date" : date , "expense.contents.key" : key} , {"expense" : 1} , (err , res_2) => {
        if(!err)
        {
          console.log(res_2[0]);
          if((res_2[0] === null)||(res_2.length === 0)||(res_2[0].expense.length === 0)||(res_2[0].expense.contents===null)||(res_2[0].expense===null))
          {
            //insert
            flag1 = 1;
          }
          else
          {
            //update
            flag1 = 2;
            present = res_2[0].expense.contents.cost;
          }
        }

        if(present === undefined)
        {
          present = 0;
        }
        present += cost;
        if(newDescription)
        {
          desc = newDescription;
        }
        else
        {
          desc = description;
        }
        if(newPurpose)
        {
          pUrpose = newPurpose;
        }
        else
        {
          pUrpose = purpose;
        }
        if(newTime)
        {
          tIme = newTime;
        }
        else
        {
          tIme = time;
        }
        
        idkey = type+pUrpose+description;

        if(flag1 === 0)
        {
          //error
          res.send(JSON.stringify({
            success : valid,
            message : message
         }));
        }
        else if(flag1 === 1)
        {
          //insert
          User.updateOne(
            {"userName" : username , "expense.date" : date} , 
            {$push : {"expense.$.contents" : 
                {_id : key , "key" : key , "type" : type , "cost" : cost , "purpose" : purpose , "description" : description , "time" : time, "method":method}}} , (err_1) => {
            if(!err_1)
            {
              valid = true;
              message = "Changes saved successfully!";
            }
            res.send(JSON.stringify({
              success : valid,
              message : message
            }));
          });
        }
        else
        {
        User.updateOne(
          {"userName" : username , "expense.date" : date , "expense.contents.type" : type , "expense.contents.purpose" : purpose} , 
          {$set : {"expense.$.contents": 
              {_id : key , "key" : key , "type" : type , "cost" : present , "purpose" : pUrpose , "description" : desc , "time" : tIme, "method":method}}} , (err) => {
          if(!err)
          {
            valid = true;
            message = "Changes saved successfully!";
          }
          res.send(JSON.stringify({
            success : valid,
            message : message
          }));
        });
        }
    });
  }
});
}
  else if(flag === 3)
  {
    //delete
    User.updateOne({"userName" : username , "expense.date" : date} , {$pull : {"expense.$.contents" : {"key" : key}}} , {multi : true} , (err) => {
      if(!err)
      {
        valid = true;
        message = "Deleted successfully!";
      }
      res.send(JSON.stringify({
        success : valid,
        message : message
      }));
    });
  }
});



module.exports = router;
