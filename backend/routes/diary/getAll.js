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

	const username = req.body.name;

	var allowed = 0;
	var count = 0;
	var valid = false;

	var query_1 = connection.query('SELECT ENABLE_DIARY FROM COMMON WHERE USERNAME = ?', username , (err , res_1) => {
		if(!err)
		{
			if(res_1[0])
			{
				allowed = 1;
			}
		}
	});

	if(allowed === 1)
	{
		valid = true;

		var query_2 = connection.query('SELECT COUNT(*) FROM ' + username + '_DIARY' , (err , res_2) => {
			if(!err)
			{
				count = res_2[0];
			}
			else
			{
				valid = false;
			}
		});

		var query_3 = connection.query('SELECT * FROM ' + username + '_DIARY' , (err , res_3) => {
			if(err)
			{
				valid = false;
			}
			res.send(JSON.stringify({
				success : valid,
				number : count,
				content : res_3
			}));
		});
	}
	else
	{
		var flag=0;
		var query_4 = connection.query('CREATE TABLE ' + username + '_DIARY (DKEY VARCHAR(20) , DDATE VARCHAR(20) , TITLE VARCHAR(50) , CONTENT TEXT)', (err,res_4) => {
				if(!err)
				{
					console.log('hi table');
					flag = 1;
					res.send(JSON.stringify({
					success : true,
					number : count,
					content : []
					}));
				}
				else{
					
					res.send(JSON.stringify({
						success : false,
						number : 6,
						content : null
					}));
				}
				
			});

	}
});

// API Key
// 1f2c3719c595f763e771e8a38e5a4de4-us10

// List Id
// d26df09927

module.exports = router;

