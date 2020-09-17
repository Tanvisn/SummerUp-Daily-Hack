const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const {jwtkey} = require('../keys')
const router = express.Router();
const User = mongoose.model('User');
const assert = require('assert');

router.post("/medicalConfirmButton" , (req , res , next) => {
	const username = req.body.name;
	const edit = req.body.edit;
	const medicineKey = req.body.medicineKey;
	const medicineDate = req.body.date;
	const measurementDate = req.body.date;
	const appointmentsKey = req.body.appointmentsKey;
	const inventoryName = req.body.inventoryName;
	const measurementKey = req.body.measurementKey;
	const value = req.body.value;
	const unit = req.body.unit;

	var valid = false;
	var message = "Something went wrong!";
	if(edit === 1)
	{
		//medicine update
		User.updateOne({"userName" : username} , {$set : {"medicines.$[i].datesArray[j].done" : true}} , {arrayFilters : [{"i.key" : medicineKey} , {"j.date" : medicineDate}]} , (err) => {
			if(!err)
			{
				//valid = true;
				//message = "Changes saved successfully!";
				User.find({"userName" : username , "inventory.key" : inventoryName} , {"inventory" : 1} , (err_1 , res_1) => {
					if(!err_1)
					{
						var newQuantity = res_1[0].inventory.totalPills;
						var subtract = res_1[0].inventory.pillsInOneDose;
						newQuantity -= subtract;
						if(newQuantity < 0)
						{
							newQuantity = -1;
						}
						User.updateOne({"userName" : username , "inventory.key" : inventoryName} , {$set : {"inventory.$.totalPills" : newQuantity}} , (err_2) => {
							if(!err_2)
							{
								valid = true;
								message = "Changes saved successfully!";
							}
							res.send(JSON.stringify({
								success : valid,
								message : message,
								totalPills : newQuantity,
								remindWhen : res_1[0].inventory.remindWhen
							}));
						});
					}
					else
					{
						res.send(JSON.stringify({
							success : valid,
							message : message,
							totalPills : -1,
							remindWhen : -1
						}));
					}
				});
			}
			else
			{
				res.send(JSON.stringify({
					success : valid,
					message : message,
					totalPills : -1,
					remindWhen : -1
				}));
			}
		});
	}
	else if(edit === 2)
	{
		//measurements update
		User.updateOne({"userName" : username} , {$set : {"measurement.$[i].datesArray[j].value" : value , "measurement.$[i].datesArray.$[j].unit" : unit , "measurement.$[i].datesArray.$[j].done" : true}} , {arrayFilters : [{"i.key" : measurementKey} , {"j.date" : measurementDate}]} , (err) => {
			if(!err)
			{
				valid = true;
				message = "Changes saved Successfully!";
			}
			res.send(JSON.stringify({
				success : valid,
				messsage : message
			}));
		});
	}
	else
	{
		//appointments update
		User.updateOne({"userName" : username , "appointments.key" : appointmentsKey} , {$set : {"appointments.$.done" : true}} , (err) => {
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
});
module.exports = router;