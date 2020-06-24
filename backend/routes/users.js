const express = require("express");
const bodyParser = require("body-parser");
var router = express.Router();
const mysql = require("mysql");

const port=5000;

var connection = mysql.createConnection({
	host : "localhost",
	user : "root",
	password : "123456789",
	database : "DAILY_PLANNER"
});

connection.connect();

router.post("/", function(req, res, next) {

	const username = req.body.name;
	const password = req.body.pass;
	console.log(password);
	var valid = false;
	var query = connection.query("SELECT * FROM TIMEPASS1 WHERE USERNAME = ?", username , (err , resp) => {
		if(!err)
		{
			if(resp[0].PASSWORD === password)
			{
				valid = true;

			}
		}
		res.send(JSON.stringify({
			success:valid,
			age:resp[0].AGE
		}));
	});
});


// API Key
// 1f2c3719c595f763e771e8a38e5a4de4-us10

// List Id
// d26df09927

module.exports = router;
