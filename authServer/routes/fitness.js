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

router.post("/fitnessGetAllLists", (req , res , next) => {

	const username = req.body.name;

	var count = 0;
	var message = "Something went wrong!";
	var valid = false;

	User.find({"userName" : username} , {"fitness" : 1} , (err , res_1) => {
		if(!err)
		{
			valid = true;
			count = res_1.length;
			if((res_1[0] === null)||(count === 0))
			{
				message = "No entries yet!";
				res_1[0] = {fitness:[]};
			}
			else
			{
				message = "Successfully fetched!";
			}
			res.send(JSON.stringify({
				success : valid,
				message : message,
				number : count,
				content : res_1[0].fitness
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

router.post("/updateFitnessList" , (req , res , next) => {
	const edit = req.body.edit;
	const key = req.body.key;
	const username = req.body.name;
	const date = req.body.date;
	const content = req.body.items;
	console.log(content+" hi");

	var valid = false;
	var message="Something went wrong!";

	if(edit === 1)
	{
		//insert

		User.updateOne({"userName" : username} , {$push : {fitness : {"_id" : key, "date": date, "key" : key, "list" : content}}} , (err) => {
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
		User.updateOne({"userName" : username , "fitness.key" : key} , {$set : {"fitness.$.date":date, "fitness.$.list" : content}} , (err) => {
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
		//add to previous list, delete prev list with this key
		console.log(key);
		User.updateOne({"userName" : username} , {$pull : {"fitness" : {"key" : key}}} , (err) => {
			if(!err)
			{
				valid = true;
				message = "Deleted successfully!";
			
				User.updateOne({"userName" : username , "fitness.date" : date} , {$push : {"fitness.$.list" : {$each: content}}} , (err) => {
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
			else{
			res.send(JSON.stringify({
				success : valid,
				message : message
			}));}
		});
	}
	else if(edit === 4)
	{
		//delete
		User.updateOne({"userName" : username} , {$pull : {"fitness" : {"key" : key}}} , (err) => {
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
})
/*
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
*/

module.exports = router;
