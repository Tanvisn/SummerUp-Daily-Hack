const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const router = express.Router();
const User = mongoose.model('User');

function splitDate(text) {
  var result = text.split('-');
  return result;
}

router.post("/notes", async (req, res) => {
  const {
    userName,
    key,
    edit,
    date,
    time,
    title,
    yourNotes
  } = req.body;

  if (edit === 1) {

  //  var splittedDate = splitDate(date);
  //  console.log(splittedDate);

    //  var day = splittedDate[0];
    //var month = splittedDate[1];
    //  var year = splittedDate[2];

    User.updateOne({
      userName: userName
    }, {
      $push: {
        "notes": {
          $each: [{
            _id: key,
            key: key,
            title: title,
            date: date,
            yourNotes: yourNotes,
            time: time
          }],
          $sort: {
            key: -1
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
            message: "Note added successfully!",
            success: true
          }));
        }
      }
    );
  } else if (edit === 2) {

  //  var splittedDate = splitDate(date);
  //  console.log(splittedDate);

//    var day = splittedDate[0];
  //  var month = splittedDate[1];
    //var year = splittedDate[2];

    User.updateOne({
      "userName": userName,
      "notes.key": key,
    }, {
      $set: {
        "notes.$.title": title,
        "notes.$.date": date,
        "notes.$.yourNotes": yourNotes,
        "notes.$.time": time,
      }
    },
      function(err) {
        console.log(err);
        if (err) {
          res.send(JSON.stringify({
            message: "Unexpected error occured, please try again!",
            success: false
          }));
        } else {
          res.send(JSON.stringify({
            message: "Note updated successfully!",
            success: true
          }));
        }
      }
    );

    User.updateOne({
      userName: userName,
    }, {
      $push: {
        "notes": {
          $each: [],
          $sort: {
            key: -1
          }
        }
      }
    },
      function(err){
        console.log(err);
      }
    );
  } else if (edit === 3) {
    User.updateOne({
      "userName": userName,
    }, {
      $pull: {
        notes: {
          "key": key,
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
            message: "Note deleted successfully!",
            success: true
          }));
        }
      }
    );
  }
  // console.log(res);
});

module.exports = router;