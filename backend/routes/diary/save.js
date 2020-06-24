const express = require("express");
const bodyParser = require("body-parser");
var router = express.Router();
const mysql = require("mysql");

const port = 3002;

var connection = mysql.createConnection({
	host : "localhost",
	user : "root",
	password : "123456789",
	database : "DAILY_PLANNER"
});

connection.connect();

router.post("/", (req , res , next) => {

	const Edit = req.body.edit;
	const Key = req.body.key;
	const username = req.body.name;
	const DAte = req.body.date;
	const Title = req.body.title;
	const content = req.body.text;

	console.log(Edit);
	console.log(Key);
	console.log(username);
	console.log(DAte);
	console.log(Title);
	console.log(content);
	var allowed = 1;
	var flag = 0;
	var valid = false;
	var message="Failed to make changes please try again";
	var query_1 = connection.query('SELECT ENABLE_DIARY FROM COMMON WHERE USERNAME = ?', username , (err , res_1) => {
		if(!err)
		{
			if(resp_1[0])
			{
				allowed = 1;
			}
		}
	});

	if(Edit)
	{
		if(allowed === 1)
		{
			if(Edit)
			{
				var query_2 = connection.query('UPDATE ' + username + '_DIARY SET TITLE = ' + Title + 'WHERE DKEY = ' + Key , (err , res_2) => {
					if(!err)
					{
						flag = 1;
					}
				});
			}
			if(flag === 1)
			{
				var query_3 = connection.query('UPDATE ' + username + '_DIARY SET TEXT = ' + Text + 'WHERE DKEY = ' + Key , (err , res_3) => {
					if(!err)
					{
						flag = 2;
					}
				});
			}
			if(flag === 2)
			{
				var query_3 = connection.query('UPDATE ' + username + '_DIARY SET DDATE = ' + DAte + 'WHERE DKEY = ' + Key , (err , res_3) => {
					if(!err)
					{
						flag = 3;
					}
				});
			}
			if(flag === 3)
			{
				valid = true;
				message = "Changes saved successfully!";
			}
		}
		res.send(JSON.stringify({
			success : valid,
			message : message
		}));
	}
	else
	{
		var temp_1 = {
			DKEY : Key,
			DDATE : DAte,
			TITLE : Title,
			CONTENT : content
		}
		if(allowed === 0)
		{
			var query_4 = connection.query('CREATE TABLE ' + username + '_DIARY (KEY VARCHAR(20) , DATE VARCHAR(20) , TITLE VARCHAR(50) , CONTENT TEXT)', (err,res_4) => {
				if(!err)
				{
					flag = 1;
				}
			});
		}
		if(((allowed === 0) && (flag === 1)) || allowed === 1)
		{
			console.log("hi");
			var query_5 = connection.query('INSERT INTO ' + username + '_DIARY SET ?' , temp_1 , (err , res_5) => {
				if(!err)
				{
					valid = true;
					message = "Changes saved successfully!";
				}
			});
		}
		res.send(JSON.stringify({
			success : valid,
			message : message
		}));
	}
});

// API Key
// 1f2c3719c595f763e771e8a38e5a4de4-us10

// List Id
// d26df09927

module.exports = router;

