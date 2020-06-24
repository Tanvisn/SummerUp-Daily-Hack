const express = require("express");
const bodyParser = require("body-parser");
var router = express.Router();
const mysql = require("mysql");

const port = 3001;

var connection = mysql.createConnection({
	host : "localhost",
	user : "root",
	password : "123456789",
	database : "DAILY_PLANNER"
});

connection.connect();

router.post("/", (req , res , next) => {

	const firstName = req.body.Fname;
	const lastName = req.body.Lname;
	const username = req.body.name;
	const password = req.body.pass;
	const Age = req.body.age;
	console.log(password);

	var en_diary = true;
	var en_shopping = true;
	var en_medical = true;
	var en_reminder = true;
	var en_sensitive = true;
	var en_expenditure = true;
	var en_workout = true;

	var temp_1 = {
		FIRST_NAME : firstName,
		LAST_NAME : lastName,
		USERNAME : username,
		PASSWORD : password,
		AGE : Age,
		ENABLE_DIARY : en_diary,
		ENABLE_SHOPPING : en_shopping,
		ENABLE_MEDICAL : en_medical,
		ENABLE_REMINDER : en_reminder,
		ENABLE_SENSITIVE : en_sensitive,
		ENABLE_EXPENDITURE : en_expenditure,
		ENABLE_WORKOUT : en_workout
	}

	var temp_2 = {
		USERNAME : username, 
		PASSWORD : password, 
		AGE : Age
	}

	var allowed = false;
	var valid = false;
	var mess = "";

	var query_1 = connection.query('SELECT PASSWORD FROM TIMEPASS1 WHERE USERNAME = ?', username , (err , res_1) => {
		if(!err)
		{
			console.log("username check");
			if(res_1[0] === undefined)
			{
				allowed = true;
				console.log("doesn't exist");
			}
			else{
				mess="Username already exists";
				console.log(" exist");
			}
		}
		else{
			mess="Something went wrong. Please try again!";
		}
	});
	
	var query_2 = connection.query('INSERT INTO TIMEPASS1 SET ?', temp_1, (err , res_2) => {
		if(!err)
		{
			console.log("insert success");
			if(allowed)
			{
				console.log("added");
				valid = true;
				mess="Successfully Signed up!";
			}
		}
		else{
			if(mess==="")
			mess="Something went wrong. Please try again!";
		}
		//valid false => error or username already registered
		res.send(JSON.stringify({
			success : valid,
			message : mess
		}));
	});
/*
	if(valid)
	{
		var query_3 = connection.query('INSERT INTO TIMEPASS1 SET ?', temp_2, (err , res_3) => {
			if(!err)
			{
				console.log('Successfully Signed up');
			}
		});
	}
	else
	{
		console.log('Try again');
	}
	*/
});

// API Key
// 1f2c3719c595f763e771e8a38e5a4de4-us10

// List Id
// d26df09927

module.exports = router;