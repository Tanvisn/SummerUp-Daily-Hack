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

    try{
      const user = new User({email,password,fName,lName,age,userName});
      await  user.save();
      //Creating token on the basis of Id.
      const token = jwt.sign({userId:user._id},jwtkey)
      res.send(JSON.stringify({
        message: "User has been successfully registered!",
  			token,
  			success : true
  		}));

    } catch(err){
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
    const user = await User.findOne({userName})
    if(!user){
        return res.status(422).send(JSON.stringify({
    			success : false,
    			message : "Incorrect username or password!!"
    		}));
    }
    try{
      await user.comparePassword(password);
      const token = jwt.sign({userId:user._id},jwtkey)
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
router.post("/getAllEntries", (req , res , next) => {

	const username = req.body.name;

	var count = 0;
	var Message = "Something went wrong!";
	var valid = false;

	User.find({"userName" : username} , {"diary" : 1} , (err , res_1) => {
		if(!err)
		{
			valid = true;
			count = res_1.length;
			if((res_1[0] === null)||(count === 0))
			{
				Message = "No entries yet!";
				res_1 = [];
			}
			else
			{
				Message = "Successfully fetched!";
			}
			res.send(JSON.stringify({
				success : valid,
				message : Message,
				number : count,
				content : res_1[0].diary
			}));
		}
		else
		{
			res.send(JSON.stringify({
				success : valid,
				message : Message,
				number : count,
				content : []
			}));
		}
	});

});

router.post("/saveEntry", (req , res , next) => {

	const edit = req.body.edit;
	const key = req.body.key;
	const username = req.body.name;
	const date = req.body.date;
	const title = req.body.title;
	const content = req.body.text;

	var valid = false;
	var message="Something went wrong!";

	if(edit === 1)
	{
		//insert
		User.updateOne({"userName" : username} , {$push : {diary : {"key" : key , "date" : date , "title" : title , "text" : content}}} , (err) => {
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
	else if(edit === 2)
	{
		//update
		User.updateOne({"userName":username, "diary.key":key}, {$set : {"diary.$.date":date, "diary.$.title":title, "diary.$.text":content}} , (err) => {
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
	else if(edit === 3)
	{
		//delete
		User.updateOne({"userName" : username} , {$pull : {diary : {"key" : key}}} , (err) => {
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

router.post("/shoppingLists", (req , res , next) => {

	const username = req.body.name;

	var count = 0;
	var message = "Something went wrong!";
	var valid = false;

	User.distinct("shopping.skey" , {"username" : username} , (err , res_1) => {
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

router.post("/getShopLists", (req , res , next) => {

	const username = req.body.name;
	const key = req.body.key;

	var count = 0;
	var message = "Something went wrong!";
	var valid = false;

	User.find({"username" : username , "shopping.skey" : key} , {"diary" : 1} , (err , res_1) => {
		if(!err)
		{
			valid = true;
			count = res_1.length;
			if((res_1[0] === null)||(count === 0))
			{
				message = "No entries yet!"
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

router.post("/shoppingUpdate", (req , res , next) => {

	const username = req.body.name;
	const key = req.body.key;//date_title
	const edit = req.body.edit;//1 for insert new element , 2 for update quantity , 3 for update checked status , 4 for update price of one item , 5 for delete
	const item = req.body.Item;//name of the item
	const quantity = req.body.qty;//the count of the updown counter
	const checked = req.body.check;//if the item is checked or not, true if checked
	const price = req.body.price;//price of a single item as entered by user

	var flag = 0;
	var message = "Something went wrong!";
	var valid = false;

	if(edit === 1)
	{
		//insert
		var total = price*quantity;
		User.updateOne({"username" : username} , {$push : {shopping : {"_id" : key+item , "skey" : key , "item" : item , "quantity" : quantity , "price" : total , "checked"  :checked}}} , (err) => {
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
	else if(edit === 5)
	{
		//delete
		User.updateOne({"username" : username} , {$pull : {shopping : {"skey" : key , "item" : item}}} , (err) => {
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
	else
	{
		//update quantity
		var id , shopKey , shopItem , checkStatus , totalQuantity , totalPrice;
		User.find({"username" : username , "shopping.skey" : key , "shopping.item" : item} , (err , res_3) => {
			if(!err)
			{
				totalPrice = res_3[0].shopping.price;
				totalQuantity = res_3[0].shopping.quantity;
			}
		});

		if(Edit === 2)
		{
			//update quantity
			totalPrice /= totalQuantity;
			totalPrice *= quantity;
			User.updateOne({"username" : username , "shopping.skey" : key , "shopping.item" : item} , {$set : {"shopping.$.quantity" : quantity , "shopping.$.price" : totalPrice}} , (err) => {
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
		if(Edit === 3)
		{
			//update checked status
			User.updateOne({"username" : username , "shopping.skey" : Key , "shopping.item" : item} , {$set : {"shopping.$.checked" : checked}} , (err) => {
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
		if(Edit === 4)
		{
			//update price
			totalPrice = totalQuantity*price;
			User.updateOne({"username" : username , "shopping.skey" : Key , "shopping.item" : item} , {$set : {"shopping.$.price" : totalPrice}} , (err) => {
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
	}
});

router.post("/expensesGetAllEntries" , (req , res , next) => {

	const username = req.body.name;
	const date = req.body.date;

	var count = 0;
	var message = "Something went wrong!";
	var valid = false;

	User.find({"username" : username} , {"expense" : 1} , (err , res_1) => {
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

router.post("/expensesUpdate" , (req , res , next) => {

	const username = req.body.name;
	const edit = req.body.edit;//if edit is 1, add the cost to the existing savings, if it is 2, add the cost to the exisiting expenses, if it is 3 delete the given entry
	const cost = req.body.cost;//common, if the date isnt found make a date like that and add, else add or subtract this cost depending on edit value
	const date = req.body.date;//in the format "mm-dd-yyyy", no space, onli hyphen and in this format coz it makes the difference in expenses all file
	const purpose = req.body.pur;//purpose for sending or receiving money, if nothing is entered, send me null

	var type;
	var message = "Something went wrong!";
	var valid = false;

	if(edit === 1)
	{
		//savings
		if(purpose === null)
		{
			purpose = "savings";
		}
		type = "savings";
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
	else
	{
		//delete
		flag = 3;
	}

	User.find({"username" : username , "expense.edate" : date , "expense.type" : type , "expense.purpose" : purpose} , {"expense" : 1} , (err , res_1) => {
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
	});

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
		User.updateOne({"username" : username} , {$push : {expense : {"_id" : new mongoose.Types.ObjectId() , "edate" : date , "type" : type , "cost" : cost , "purpose" : purpose}}} , (err) => {
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
	else if(flag === 2)
	{
		//update
		var present;
		var pUrpose;
		User.find({"username" : username , "expense.edate" : date , "expense.type" : type , "expense.purpose" : purpose} , (err , res_2) => {
			if(!err)
			{
				pUrpose = res_2[0].expense.purpose;
				present = res_2[0].expense.cost;
			}
		});

		present += Cost;
		pUrpose = purpose;

		User.updateOne({"username" : username , "edate" : date , "type" : type , "purpose" : purpose} , {$set : {"expense.$.cost" : present , "$expense.$.purpose" : pUrpose}} , (err) => {
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
	else
	{
		//delete
		User.updateOne({"username" : username} , {$pull : {expense : {"edate" : date , "type" : type , "purpose" : purpose}}} , (err) => {
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

router.post("/fitnessGetAllListEntries", (req , res , next) => {

	const username = req.body.name;

	var count = 0;
	var message = "Something went wrong!";
	var valid = false;

	User.find({"username" : username} , {"fitness.list" : 1} , (err , res_1) => {
		if(!err)
		{
			valid = true;
			count = res_1.length;
			if((res_1[0].list === null)||(count === 0))
			{
				message1 = "No entries yet!"
				res_1 = [];
			}
			else
			{
				message1 = "Successfully fetched!";
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
				content : [],
			}));
		}
	});
});

router.post("/fitnessGetAllDateEntries", (req , res , next) => {

	const username = req.body.name;
	const date = req.body.date;

	var count = 0;
	var message = "Something went wrong!";
	var valid = false;

	User.find({"username" : username} , {"fitness.data" : 1} , (err , res_1) => {
		if(!err)
		{
			valid = true;
			count = res_1.length;
			if((res_1[0].list === null)||(count === 0))
			{
				message1 = "No entries yet!"
				res_1 = [];
			}
			else
			{
				message1 = "Successfully fetched!";
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
				content : [],
			}));
		}
	});
});

router.post("/fitnessUpdateList", (req , res , next) => {

	const username = req.body.name;
	const edit = req.body.edit;//1 for insert new work , 2 for update checked status , 3 for delete
	const work = req.body.work;//name of the item
	const checked = req.body.check;//if the item is checked or not, true if checked

	var flag = 0;
	var message = "Something went wrong!";
	var valid = false;

	if(edit === 1)
	{
		//insert
		User.updateOne({"username" : username} , {$push : {"fitness.$.list" : {"_id" : work , "work" : work , "checked"  : checked}}} , (err) => {
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
	else if(edit === 2)
	{
		User.updateOne({"username" : username , "fitness.list.work" : work} , {$set : {"fitness.$.list.$.checked" : checked}} , (err) => {
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
	else if(edit === 3)
	{
		//delete
		User.updateOne({"username" : username , "fitness.list.work" : work} , {$unset : {"fitness.$.list.$._id" : "" , "fitness.$.list.$.work" : "" , "fitness.$.list.$.checked" : ""}} , (err) => {
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

router.post("/fitnessUpdateData", (req , res , next) => {

	const username = req.body.name;
	const edit = req.body.edit;//1 for insert new work , 2 for update checked status
	const date = req.body.date;
	const timer = req.body.timer;//name of the item

	var flag = 0;
	var message = "Something went wrong!";
	var valid = false;

	if(edit === 1)
	{
		//insert
		User.updateOne({"username" : username} , {$push : {"fitness.$.data" : {"_id" : date , "date" : date , "timer" : timer}}} , (err) => {
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
	else if(edit === 2)
	{
		//update
		User.updateOne({"username" : username , "fitness.data.date" : date} , {$set : {"fitness.$.data.$.timer" : timer}} , (err) => {
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
	else if(edit === 3)
	{
		//delete
		User.updateOne({"username" : username , "fitness.data.date" : date} , {$unset : {"fitness.$.data.$._id" : "" , "fitness.$.data.$.date" : "" , "fitness.$.data.$.timer" : ""}} , (err) => {
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

router.post("/getAllShopLists", (req , res , next) => {

	const username = req.body.name;

	var count = 0;
	var Message = "Something went wrong!";
	var valid = false;

	User.find({"userName" : username} , {"shopping" : 1} , (err , res_1) => {
		if(!err)
		{
			valid = true;
			count = res_1.length;
			if((res_1[0] === null)||(count === 0))
			{
				Message = "No entries yet!";
				res_1 = [];
			}
			else
			{
				Message = "Successfully fetched!";
			}
			res.send(JSON.stringify({
				success : valid,
				message : Message,
				number : count,
				content : res_1[0].shopping
			}));
		}
		else
		{
			res.send(JSON.stringify({
				success : valid,
				message : Message,
				number : count,
				content : []
			}));
		}
	});

});

router.post("/saveShopList", (req , res , next) => {

	const edit = req.body.edit;
	const key = req.body.key;
	const username = req.body.name;
	const title = req.body.title;
	const content = req.body.items;
console.log(content+" hi");

	var valid = false;
	var message="Something went wrong!";

	if(edit === 1)
	{
		//insert
		User.updateOne({"userName" : username} , {$push : {shopping : {"key" : key , "title" : title , "content" : content}}} , (err) => {
			if(!err)
			{
				valid = true;
				message = "Changes saved successfully!";
			}
			res.send(JSON.stringify({
				success : valid,
				message : message,
				content : content,
			}));
		});
	}
	else if(edit === 2)
	{
		//update
		console.log(key);
		User.updateOne({"userName" : username , "shopping.key" : key} , {$set : {"shopping.$.title" : title , "shopping.$.content" : content}} , (err) => {
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
	else if(edit === 3)
	{
		//delete
		User.updateOne({"userName" : username} , {$pull : {shopping : {"key" : key}}} , (err) => {
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