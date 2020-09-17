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

router.post("/getMonthlySavings" , (req , res , next) => {

	const username = req.body.name;
	const type = req.body.type;

	var count = 0;
	var message = "Something went wrong!";
	var valid = false;

	User.aggregate([{$match : {"userName" : username , "expense.content.type" : "savings"}} , {$unwind : "$expense"} , {$unwind : "$expense.contents"} , {$group : {_id : "$expense.month" , "month" : "$expense.month" , "savings" : {$sum : "$expense.contents.cost"}}}] , (err , res_1) => {
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


module.exports = router;
