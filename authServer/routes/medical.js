const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const {jwtkey} = require('../keys')
const router = express.Router();
const User = mongoose.model('User');
const assert = require('assert');

router.post("/getMedMeasure", async (req, res) => {
	const {userName} = req.body;
	const year = req.body.year;
	const month = req.body.month;
	const date = req.body.date;

	var tempDate = year+"-"+month+"-"+date;

	User.aggregate([{$match : {"userName" : userName , "medicines.datesArray.date" : {$lte : tempDate}}} , {$unwind : "$medicines"} , {$unwind : "$medicines.datesArray"} , {$group : {_id : {"date" : "$medicines.datesArray.date"} , "medicines" : "$medicines"}}] , (err_1 , result_1) => {
		if(!err_1)
		{
			var message;
			if((result_1.length === 0)||(result_1[0] === null))
			{
				result = [];
				message = "No entries!";
			}
			else
			{
				message = "Successfully fetched!";
			}
			User.aggregate([{$match : {"userName" : userName , "measurement.datesArray.date" : {$lte : tempDate}}} , {$unwind : "$measurement"} , {$unwind : "$measurement.datesArray"} , {$group : {_id : {"date" : "$measurement.datesArray.date"} , "measurement" : "$medicines"}}] , (err_2 , result_2) => {
				if(!err_2)
				{
					if((result_2.length === 0)||(result_2[0] === null))
					{
						result = [];
						message = "No entries!";
					}
					else
					{
						message = "Successfully fetched!";
					}
					res.send(JSON.stringify({
						success : true,
						message : message,
						data : result_1.concat(result_2)
					}));
				}
				else
				{
					res.send(JSON.stringify({
						success : false,
						message : "Something went wrong, please try again!",
						data : []
					}));
				}
			});
		}
		else
		{
			res.send(JSON.stringify({
				success : false,
				message : "Something went wrong, please try again!",
				data : []
			}));
		}
	});
});

router.post("/getDocApp", async (req, res) => {
        const {userName} = req.body;

        User.find({
                "userName" : userName
        }, {
                "appointments" : 1
        },
                (err, result) => {
                        if (!err) 
                        {
                                var message;
                                if((result.length === 0)||(result[0] === null)||(result[0].appointments.length === 0))
                                {
                                        result = [];
                                        message = "No entries!";
                                }
                                else
                                {
                                        message = "Successfully fetched!";
                                }
                                res.send(JSON.stringify({
                                        data: result,
                                        success: true,
                                        message: message
                                }));
                        } 
                        else 
                        {
                                console.log(err);
                                res.send(JSON.stringify({
                                        data: [],
                                        success: false,
                                        message: "Something went wrong, please try again!"
                                }));
                        }
                }
        )
});

/*

router.post("/medicalSetRight" , (req , res , next) => {
	const username = req.body.name;

	User.find({"userName" : username} , {"medical" : 1} , (err , res_1) => {
		if(!err)
		{
			if((res_1[0] === null)||(res_1[0].medical.length === 0))
			{
				User.updateOne({"userName" : username} , {$push : {"medical" : {"medicines" : [] , "appointments" : [] , "health" : []}}} , (err) => {
					if(!err)
					{
						res.send(JSON.stringify({
							success : true,
							message : "Done!"
						}));
					}
					else
					{
						res.send(JSON.stringify({
							success : false,
							message : "Error!"
						}));
					}
				});
			}
			else
			{
				res.send(JSON.stringify({
					success : true,
					message : "Not needed!"
				}));
			}
		}
		else
		{
			res.send(JSON.stringify({
				success : false,
				message : "Error!"
			}));
		}
	});
});

router.post("/medicalGetAllMedicines" , (req , res , next) => {
	const username = req.body.name;

	var valid = false;
	var message = "Something went wrong!";
	var count = 0;

	User.find({"userName" : username} , {"medical.medicines" : 1} , (err , res_1) => {
		if(!err)
		{
			valid = true;
			count = res_1.length;
			if((res_1[0] === null)||(count === 0)||(res_1[0].medical.medicines.length === 0))
			{
				message = "No entries yet!";
				res_1 = [];
			}
			else
			{
				message = "Successfully fetched!";
			}
		}
		res.send(JSON.stringify({
			success : valid,
			message : message,
			number : count,
			content : res_1
		}));
	});
});

router.post("/medicalGetAllAppointments" , (req , res , next) => {
	const username = req.body.name;

	var valid = false;
	var message = "Something went wrong!";
	var count = 0;

	User.find({"userName" : username} , {"medical.appointments" : 1} , (err , res_1) => {
		if(!err)
		{
			valid = true;
			count = res_1.length;
			if((res_1[0] === null)||(count === 0)||(res_1[0].medical.appointments.length === 0))
			{
				message = "No entries yet!";
				res_1 = [];
			}
			else
			{
				message = "Successfully fetched!";
			}
		}
		res.send(JSON.stringify({
			success : valid,
			message : message,
			number : count,
			content : res_1
		}));
	});
});

router.post("/medicalGetAllHealth" , (req , res , next) => {
	const username = req.body.name;

	var valid = false;
	var message = "Something went wrong!";
	var count = 0;

	User.find({"userName" : username} , {"medical.health" : 1} , (err , res_1) => {
		if(!err)
		{
			valid = true;
			count = res_1.length;
			if((res_1[0] === null)||(count === 0)||(res_1[0].medical.health.length === 0))
			{
				message = "No entries yet";
				res_1 = [];
			}
			else
			{
				message = "Successfully fetched!";
			}
		}
		res.send(JSON.stringify({
			success : valid,
			message : message,
			number : count,
			content : res_1
		}));
	});
});

router.post("/medicalUpdateMedicines" , (req , res , next) => {
	const username = req.body.name;
	const edit = req.body.edit;//1 for insert new one , 2 for update the medicine , 3 for delete
	const name = req.body.med;//name of medicine , for insert , update and delete
	const time = req.body.time;//this is an array of times when it must be taken , for insert and update
	const startDate = req.body.start;//start date , for insert and update
	const endDate = req.body.end;//end date , for insert and update
	const description = req.body.desc;//description , for insert and update

	var valid = false;
	var message = "Something went wrong!";

	if(edit === 1)
	{
		//insert
		User.updateOne({"userName" : username} , {$push : {"medical.$.medicines" : {_id : "name" , "key" : name , "name" : name , "time" : time , "startDate" : startDate , "endDate" : endDate , "description" : description}}} , (err) => {
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
		User.updateOne({"userName" : username , "medical.medicines.name" : name} , {$set : {"medical.$.medicines.$._id" : name , "medical.$.medicines.$.key" : name , "medical.$.medicines.$.name" : name , "medical.$.medicines.$.time" : time , "medical.$.medicines.$.startDate" : startDate , "medical.$.medicines.$.endDate" : endDate , "medical.$.medicines.$.description" : description}} , (err) => {
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
		User.updateOne({"userName" : username} , {$pull : {"medical.$.medicines" : {"key" : name}}} , {multi : true} , (err) => {
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

router.post("/medicalUpdateAppointments" , (req , res , next) => {
	const username = req.body.name;
	const edit = req.body.edit;//1 for insert new one , 2 for update the medicine , 3 for delete
	const date = req.body.date;//date when the appointment is, for insert , update and delete
	const docName = req.body.doc;//name of doctor , for insert and update
	const docSpec = req.body.spec;//specialisation , for insert and update
	const time = req.body.time;//this is an array of times when he must get reminded , for insert and update
	const address = req.body.duration;//address , for insert , update and delete
	const num = req.body.num;//phone number , for insert and update

	var valid = false;
	var message = "Something went wrong!";
	var id = date+address;

	if(edit === 1)
	{
		//insert
		User.updateOne({"userName" : username} , {$push : {"medical.$.appointments" : {_id : id , "key" : id , "date" : date , "docName" : docName , "docSpec" : docSpec , "address" : address , "time" : time , "phone" : num}}} , (err) => {
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
		User.updateOne({"userName" : username , "medical.appointments.key" : name} , {$set : {"medical.$.appointments.$._id" : id , "medical.$.appointments.$.key" : id , "medical.$.appointments.$.date" : date , "medical.$.appointments.$.docName" : docName , "medical.appointments.$.docSpec" : docSpec , "medical.$.appointments.$.address" : address , "medical.$.appointments.$.time" : time , "medical.$.appointments.$.phone" : num}} , (err) => {
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
		User.updateOne({"userName" : username} , {$pull : {"medical.$.appointments" : {"key" : id}}} , {multi : true} , (err) => {
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

router.post("/medicalUpdateHealth" , (req , res , next) => {
	const username = req.body.name;
	const edit = req.body.edit;//1 for insert new one , 2 for update the medicine , 3 for delete
	const key = req.body.key;//unique key , for insert , update and delete
	const type = req.body.date;//type of measurement , for insert , update and delete
	const startDate = req.body.start;//start date , for insert and update
	const endDate = req.body.end;//end date , for insert and update
	const time = req.body.time;//this is an array of times when he must get reminded , for insert and update
	const description = req.body.desc;//description , for insert and update

	var valid = false;
	var message = "Something went wrong!";

	if(edit === 1)
	{
		//insert
		User.updateOne({"userName" : username} , {$push : {"medical.$.health" : {_id : key , "key" : key , "type" : type , "startDate" : startDate , "endDate" : endDate , "time" : time , "decsription" : description}}} , (err) => {
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
		User.updateOne({"userName" : username , "medical.health.key" : key} , {$set : {"medical.$.health.$._id" : key , "medical.$.health.$.key" : key , "medical.$.health.$.type" : type , "medical.$.health.$.startDate" : startDate , "medical.health.$.endDate" : endDate , "medical.$.health.$.time" : time , "medical.$.health.$.description" : descritpion}} , (err) => {
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
		User.updateOne({"userName" : username} , {$pull : {"medical.$.health" : {"key" : key}}} , {multi : true} , (err) => {
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
