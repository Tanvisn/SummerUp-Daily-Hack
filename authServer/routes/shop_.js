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
				res_1[0] = {shopping:[]};
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
