const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const {jwtkey} = require('../keys')
const router = express.Router();
const User = mongoose.model('User');
const assert = require('assert');
require("mongoose-type-email");

router.post("/getAllDiaryEntries", (req , res , next) => {

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
				Message = "No entries yet";
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

module.exports = router;
