const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const {
  jwtkey
} = require('../keys')
const router = express.Router();
const User = mongoose.model('User');
const assert = require('assert');
require("mongoose-type-email");
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post("/feedback", (req, res, next) => {

	const {userName, key, comments, rating, edit, name} = req.body;

	if (edit === 1) {
    User.updateOne({
      userName: userName
    }, {
      $push: {
        "feedback": {
          $each: [{
						_id: key,
			      name: name,
			      comments: comments,
			      rating: rating
          }],
          $sort: {
            _id: -1
          }
        }
      }
    },
      function(err) {
        if (err) {
          console.log(err);
          res.send(JSON.stringify({
            message: "Unexpected error occured, please try again!",
            success: false
          }));
        } else {
          res.send(JSON.stringify({
            message: "Feedback added successfully!",
            success: true
          }));
        }
      }
    );
  } else{
		User.updateOne({
      "userName": userName,
    }, {
      $pull: {
        feedback: {
          "_id": key,
        }
      }
    },
      function(err) {
        if (err) {
          res.send(JSON.stringify({
            message: "Unexpected error occured, please try again!",
            success: false
          }));
        } else {
          res.send(JSON.stringify({
            message: "Feedback deleted successfully!",
            success: true
          }));
        }
      }
    );
	}
});
module.exports = router;