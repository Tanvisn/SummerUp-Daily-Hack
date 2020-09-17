const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const {jwtkey} = require('../keys')
const router = express.Router();
const User = mongoose.model('User');
const assert = require('assert');

router.post("/eventsConfirmButton" , (req , res , next) => {
        const username = req.body.name;
        const edit = req.body.edit;//1 for events , 2 for special events
        const eventKey = req.body.eventKey;
        const specialKey = req.body.eventKey;

        var valid = false;
        var message = "Something went wrong!";

        if(edit === 1)
        {
                User.updateOne({"events.key" : eventKey} , {$set : {"events.$.done" : true}} , (err) => {
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
                User.updateOne({"specialEvents.key" : eventKey} , {$set : {"specialEvents.$.done" : true}} , (err) => {
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
});

router.post("/getAllEventsSub", (req , res , next) => {
	const {userName} = req.body;

	var message = "Something went wrong, please try again!";

	User.find({
		"userName" : userName
	}, {
		"specialEvents" : 1,
		"events" : 1,
		"notes" : 1
	},
		(err_1 , res_1) => {
			if (!err_1) 
			{
				console.log(res_1);
				if((res_1[0] === null)||(res_1.length === 0))
				{
					data_1 = [];
					message = "No entries yet!";
					console.log("length=0");
				}
				else
				{
					message = "Successfully fetched!";
					var data = res_1[0].specialEvents;
					var data_2 = data.concat(res_1[0].events);
					var data_1 = data_2.concat(res_1[0].notes);
				}

				//var data = res_1[0].specialEvents;
				
				//var data = res_1[0].specialEvents.concat(res_1[0].events);
				//var data_1 = data.concat(res_1[0].notes);
				res.send(JSON.stringify({
                                        success: true,
                                        message: message,
                                        data : data_1
                                }));
			}
			else 
			{
				console.log(err);
				res.send(JSON.stringify({
					success: false,
					message: "Something went wrong, please try again!",
					data : []
				}));
			}
		}
	)
});

/*
router.post("/getAllEventsSub", (req , res , next) => {
	const {userName} = req.body;

	var message = "Something went wrong, please try again!";

	User.find({
		"userName" : userName
	}, {
		"specialEvents" : 1,
		"events" : 1,
		"notes" : 1
	},
		(err_1 , res_1) => {
			if (!err_1) 
			{
				if((res_1[0] === null)||(res_1.length === 0))
				{
					res_1 = [];
					message = "No entries yet!";
				}
				else
				{
					message = "Successfully fetched!";
				}

				var data = res_1[0].specialEvents;
				
				//var data = res_1[0].specialEvents.concat(res_1[0].events);
				var data_1 = data.concat(res_1[0].notes);
				res.send(JSON.stringify({
                                        success: true,
                                        message: message,
                                        data : data_1
                                }));
			}
			else 
			{
				console.log(err);
				res.send(JSON.stringify({
					success: false,
					message: "Something went wrong, please try again!",
					data : []
				}));
			}
		}
	)
});

router.post("/getAllEventsSub", (req, res, next) => {
	const {userName} = req.body;

	var message = "Something went wrong, please try again!";
	*/
/*	router.post("/getAllEventsSub", (req , res , next) => {
	const {userName} = req.body;

	var message = "Something went wrong, please try again!";

	User.find({
		"userName" : userName
	}, {
		"specialEvents" : 1,
		"events" : 1,
		"notes" : 1
	},
		(err_1 , res_1, next) => {
			if (!err_1) 
			{
				if((res_1[0] === null)||(res_1.length === 0))
				{
					res_1 = [];
					message = "No entries yet!";
				}
				else
				{
					message = "Successfully fetched!";
				}
				console.log(res_1);
				var data = res_1[0].specialEvents.concat(res_1[0].events);
				var data_1 = data.concat(res_1[0].notes);
				res.send(JSON.stringify({
                                        success: true,
                                        message: message,
                                        data : data_1
                                }));
			}
			else 
			{
				console.log(err);
				res.send(JSON.stringify({
					success: false,
					message: "Something went wrong, please try again!",
					data : []
				}));
			}
		}
	)
});
*/
	/*
	User.find({
		"userName" : userName
	}, {
		"specialEvents" : 1
	},
		(err_1 , res_1) => {
			if (!err_1) 
			{
				if((res_1[0] === null)||(res_1.length === 0)||(res_1[0].specialEvents.length === 0))
				{
					res_1 = [];
					message = "No entries yet!";
				}
				User.find({
					"userName" : userName
				}, {
					"events" : 1
				},
					(err_2 , res_2) => {
						if (!err_2) 
						{
							if((res_2[0] === null)||(res_2.length === 0)||(res_2[0].events.length === 0))
							{
								res_2 = [];
								message = "No entries yet!";
							}
							User.find({
								"userName" : userName
							}, {
								"notes" : 1
							},
								(err_3, res_3) => {
									if (!err_3) 
									{
										if((res_3[0] === null)||(res_3.length === 0)||(res_3[0].notes.length === 0))
										{
											res_3 = [];
											message = "No entries yet!";
										}
										else
										{
											message = "Successfully fetched!";
										}

										var data = res_2.concat(res_3);
										var data1 = res_1.concat(data); 

										res.send(JSON.stringify({
											success : true,
											message	: message,
											data : data1
										}));
									} 
									else 
									{
										console.log(err);
										res.send(JSON.stringify({
											success: false,
											message: "Something went wrong, please try again!",
											data : []
										}));
									}
								}
							)
						} 
						else 
						{
							console.log(err);
							res.send(JSON.stringify({
								success: false,
								message: "Something went wrong, please try again!",
								data : []
							}));
						}
					}
				)
			}
			else 
			{
				console.log(err);
				res.send(JSON.stringify({
					success: false,
					message: "Something went wrong, please try again!",
					data : []
				}));
			}
		}
	)
});*/

/*
router.post("/eventsSetRight" , (req , res , next) => {
	const username = req.body.name;

	User.find({"userName" : username} , {"events" : 1} , (err , res_1) => {
		if(!err)
		{
			if((res_1[0] === null)||(res_1[0].events.length === 0))
			{
				User.updateOne({"userName" : username} , {$push : {"events" : {"notes" : [] , "notifications" : []}}} , (err) => {
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

router.post("/eventGetAllNotes" , (req , res , next) => {
	const username = req.body.name;

	var valid = false;
	var message = "Something went wrong!";
	var count = 0;

	User.find({"userName" : username} , {"events.notes" : 1} , (err , res_1) => {
		if(!err)
		{
			valid = true;
			count = res_1.length;
			if((res_1[0] === null)||(count === 0)||(res_1[0].eventReminder.notes.length === 0))
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

router.post("/eventGetAllNotifications" , (req , res , next) => {
	const username = req.body.name;

	var valid = false;
	var message = "Something went wrong!";
	var count = 0;

	User.find({"userName" : username} , {"events.notifications" : 1} , (err , res_1) => {
		if(!err)
		{
			valid = true;
			count = res_1.length;
			if((res_1[0] === null)||(count === 0)||(res_1[0].events.notification.length === 0))
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

router.post("/eventsUpdateNotes", (req , res , next) => {

	const edit = req.body.edit;//1 for insert new one , 2 for update , 3 for delete
	const key = req.body.key;//unique key for each entry , for insert , update and delete
	const username = req.body.name;
	const date = req.body.date;//date of the entry , for insert and update
	const title = req.body.title;//title of the note , for insert and update
	const content = req.body.text;//content , for insert and update

	var valid = false;
	var message="Something went wrong!";

	if(edit === 1)
	{
		//insert
		User.updateOne({"username" : username} , {$push : {"events.$.notes" : {_id : key , "key" : key , "date" : date , "title" : title , "text" : content}}} , (err) => {
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
		User.updateOne({"username" : username , "events.notes.key" : key} , {$set : {"events.$.notes" : {_id : key , "key" : key , "date" : date , "title" : title , "content" : content}}} , (err) => {
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
		User.updateOne({"username" : username} , {$pull : {"events.$.notes" : {"key" : key}}} , {multi : true} , (err) => {
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

router.post("/eventsUpdateNotifications", (req , res , next) => {

	const edit = req.body.edit;//1 for insert new one , 2 for update the medicine , 3 for delete
	const key = req.body.key;//unique key , for insert , update and delete
	const username = req.body.name;
	const time = req.body.date;//array of times when the user wants to get reminded , for insert and update
	const title = req.body.title;//title of reminder , for insert and update
	const content = req.body.text;//content of the reminder , for insert and update

	var valid = false;
	var message="Something went wrong!";

	if(edit === 1)
	{
		//insert
		User.updateOne({"username" : username} , {$push : {"events.$.notifications" : {_id : key , "key" : key , "time" : time , "title" : title , "text" : content}}} , (err) => {
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
		User.updateOne({"username" : username , "events.notifications.key" : key} , {$set : {"events.$.notifications" : {_id : key , "key" : key , "time" : time , "title" : title , "content" : content}}} , (err) => {
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
		User.updateOne({"username" : username} , {$pull : {"events.$.notifications" : {"key" : key}}} , {multi : true} , (err) => {
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