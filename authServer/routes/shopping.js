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


module.exports = router;
