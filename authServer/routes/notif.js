const express = require("express");
const { Expo } = require("expo-server-sdk");
const app = express();
const expo = new Expo();
const mongoose = require('mongoose')
const User = mongoose.model('User');
const schedule = require('node-schedule');
const moment = require("moment");
const router = express.Router();

const handlePushTokens = (title, body, data, pushToken) => {
  let notifications = [];
    console.log(pushToken);

    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
    }

    notifications.push({
      to: pushToken,
      sound: "default",
      title: title,
      body: body,
      data: data
    });

  let chunks = expo.chunkPushNotifications(notifications);

  (async () => {
    for (let chunk of chunks) {
      try {
        let receipts = await expo.sendPushNotificationsAsync(chunk);
        console.log("hey", receipts);
      } catch (error) {
        console.error(error);
      }
    }
  })();
};

var getDates = function(startDate, endDate) {
  var dates = [],
      currentDate = startDate,
      addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };
  while (currentDate <= endDate) {
    var temp = currentDate.toISOString();
    dates.push(temp);
    currentDate = addDays.call(currentDate, 1);
  }
  return dates;
};

function splitDate(date){
  var result = date.split('-');
  return result;
}

function splitDay(date){
  var result = date.split('T');
  return result;
}

function splitTime(date){
  var result = date.split(':');
  return result;
}

router.use(express.json());

router.post("/docApp", async (req,res)=>{
  const {userName,title,body,
          data,year,month,date,hour,minutes,seconds,nameOfDoc,medicalSpeciality,address,phoneNumber,curr_token,key} = req.body;

  User.updateOne({
    "userName": userName
  }, {
    $push: {
      appointments: {
        $each: [{
          _id: key,
          key : key,
          title: title,
          body: body,
          year: year,
          month: month,
          date: date,
          hour: hour,
          minutes: minutes,
          seconds: seconds,
          done: false,
          nameOfDoc: nameOfDoc,
          medicalSpeciality: medicalSpeciality,
          address: address,
          phoneNumber: phoneNumber
        }],
        $sort: {
          _id: -1
        }
      }
    }
  },
  function(err) {
    if (err) {
      res.send(error);
    }
  });

  var reminderDate = new Date(year, (month-1), date, hour, minutes,seconds);
  data.key = key;

  var j = schedule.scheduleJob(reminderDate, function(){
    handlePushTokens(title, body, data, curr_token);

    console.log(`Received message, with title: ${title}`);
  });
  res.send(JSON.stringify({"success":"true"}));
});

router.post("/specialEvents", async (req,res)=>{
  const {userName,title,body,
          data,year,month,date,hour,minutes,seconds,eventName,description,curr_token,key} = req.body;

  const new_date = new Date(year, month-1, date, hour, minutes,seconds);
  console.log(new_date);

  User.updateOne({
    "userName": userName
  }, {
    $push: {
      specialEvents: {
        $each: [{
          _id: key,
    key : key,
          title: title,
          body: body,
          year: year,
          month: month,
          date: date,
          hour: hour,
          minutes: minutes,
          seconds: seconds,
          done: false,
          eventName: eventName,
          description: description,
        }],
        $sort: {
          _id: -1
        }
      }
    }
  },
  function(err){
    if (err) {
      res.send(error);
    }
  });

  var reminderDate = new Date(year, (month-1), date, hour, minutes,seconds);
  data.key=key;

  console.log(reminderDate);
  var j = schedule.scheduleJob(reminderDate, function(){
    handlePushTokens(title, body, data, curr_token);
    console.log(`Received message, with title: ${title}`);
  });
  res.send(JSON.stringify({"success":"true"}));
});

router.post("/events", async (req,res)=>{
  const {userName,title,
          data,body,year,month,date,hour,minutes,seconds,eventName,description,curr_token,key} = req.body;

  User.updateOne({
    "userName": userName
  }, {
    $push: {
      events: {
        $each: [{
          _id: key,
    key : key,
          title: title,
          body: body,
          year: year,
          month: month,
          date: date,
          hour: hour,
          minutes: minutes,
          seconds: seconds,
          done: false,
          eventName: eventName,
          description: description
        }],
        $sort: {
          _id: -1
        }
      }
    }
  },
  function(err) {
    if (err) {
      res.send(error);
    }
  });

  var reminderDate = new Date(year, (month-1), date, hour, minutes,seconds);
  data.key = key;

  var j = schedule.scheduleJob(reminderDate, function(){
    handlePushTokens(title, body, data, curr_token);
    console.log(`Received message, with title: ${title}`);
  });
  res.send(JSON.stringify({"success":"true"}));
});

router.post("/measurementReminder", async (req, res) => {
  const {
    timeArray,
    key,
    userName,
    title,
    body,
    data,
    start_year,
    start_month,
    start_date,
    end_year,
    end_month,
    end_date,
    typeOfMeasurement,
    value,
    unit,
    description,
    curr_token
  } = req.body;
  // console.log(timeArray);
  // console.log(typeof(timeArray[0]));

  var startDate = start_year + "," + start_month + "," + (start_date + 1);
  var endDate = end_year + "," + end_month + "," + (end_date + 1);

  const datesArray = getDates(new Date(startDate), new Date(endDate));
  // console.log(datesArray);

  var datesarray = new Array();
  var count = 0;

  startDate = start_year + "-" + start_month + "-" + start_date;
  endDate = end_year + "-" + end_month + "-" + end_date;

  console.log(typeof(startDate));
  console.log(endDate);

  for (let i = 0; i < datesArray.length; i++) {
    var dateFormat = splitDay(datesArray[i]);
    var block = {
      date: dateFormat[0],
      done: false,
      value: 0,
      unit: "Please enter the unit!"
    }
    datesarray.push(block);
  }

  console.log(datesarray);

  for (let k = 0; k < timeArray.length; k++) {
    var splittedTime = splitTime(timeArray[k]);
    var hour = splittedTime[0];
    var minutes = splittedTime[1];
    var seconds = splittedTime[2];

      data.key = key;

    for (let i = 0; i < datesArray.length; i++) {

      var splittedDate = splitDate(datesArray[i]);

      var year = splittedDate[0];
      var month = splittedDate[1];
      var day = splittedDate[2];

      var date = splitDay(day);
      day = date[0];

      var date = new Date(year, month - 1, day, hour, minutes, seconds);
      data.date=date;

      var j = schedule.scheduleJob(date, function() {
        handlePushTokens(title, body, data, curr_token);
        console.log('The answer to life, the universe, and everything!');
        console.log(`Received message, with title: ${title}`);
      });
    }

    User.updateOne({
        "userName": userName
      }, {
        $push: {
          measurement: {
            _id: key,
            key : key,
            title: title,
            body: body,
            start_year: start_year,
            start_month: start_month,
            start_date: start_date,
            end_year: end_year,
            end_month: end_month,
            end_date: end_date,
            hour: hour,
            minutes: minutes,
            seconds: seconds,
            done: false,
            typeOfMeasurement: typeOfMeasurement,
            description: description,
            value: value,
            unit: unit,
            startDate: startDate,
            endDate: endDate,
            datesArray: datesArray,
          }
        }
      },
      function(err) {
        if (err) {
          res.send(err);
        }
      }
    );
    count++;
  }
  res.send(JSON.stringify({"success":"true"}));
});

router.post("/medicineReminder", async (req, res) => {
  const {
    key,
    timeArray,
    userName,
    title,
    body,
    start_year,
    start_month,
    start_date,
    end_year,
    end_month,
    end_date,
    name,
    data,
    description,
    curr_token
  } = req.body;


  var startDate = start_year + "," + start_month + "," + (start_date + 1);
  var endDate = end_year + "," + end_month + "," + (end_date + 1);

  var datesArray = [];
  datesArray = getDates(new Date(startDate), new Date(endDate));

  startDate = start_year + "-" + start_month + "-" + start_date;
  endDate = end_year + "-" + end_month + "-" + end_date;

  var datesarray = [];
  var count = 0;

  for (let i = 0; i < datesArray.length; i++) {
    var dateFormat = splitDay(datesArray[i]);
    var block = {
      date: dateFormat[0],
      done: false
    }
    datesarray.push(block);
  }

  console.log(datesarray);

  for (let k = 0; k < timeArray.length; k++) {
    var splittedTime = splitTime(timeArray[k]);
    var hour = splittedTime[0];
    var minutes = splittedTime[1];
    var seconds = splittedTime[2];
    var id = key + count
    data.key= keyArray[k]

    for (let i = 0; i < datesArray.length; i++) {

      var splittedDate = splitDate(datesArray[i]);
      var year = splittedDate[0];
      var month = splittedDate[1];
      var day = splittedDate[2];

      var date = splitDay(day);
      day = date[0];

      var date = new Date(year, month - 1, day, hour, minutes, seconds);
      data.date=date;
      var j = schedule.scheduleJob(date, function() {
        handlePushTokens(title, body, data, curr_token);
        console.log('The answer to life, the universe, and everything!');
        console.log(`Received message, with title: ${title}`);
      });
    }

    User.updateOne({
        "userName": userName
      }, {
        $push: {
          medicines: {
            _id: key,
            title: title,
            body: body,
            key:key,
            start_year: start_year,
            start_month: start_month,
            start_date: start_date,
            end_year: end_year,
            end_month: end_month,
            end_date: end_date,
            hour: hour,
            minutes: minutes,
            seconds: seconds,
            done: false,
            name: name,
            description: description,
            datesArray: datesArray,
            startDate: startDate,
            endDate: endDate
          }
        }
      },
      function(err) {
        if (err) {
          res.send(err);
        }
      }
    );
    User.find({"userName" : userName , "inventory.nameOfMedicine" : name} , {"inventory" : 1} , (err , res_1) => {
      if(!err)
      {
        if((res_1[0] === null)||(res_1.length === 0)||(res_1[0].inventory.length === 0))
        {
          User.updateOne({"userName" : userName} , {$push : {"invertory" : {_id : name , "key" : name , "nameOfMedicine" : name , "totalPills" : -1 , "pillsInOneDose" : -1 , "remindWhen" : -1}}} , (err_1) => {
            if(err_1)
            {
              console.log(err_1);
            }
          });
        }
      }
    });
  }
  res.send(JSON.stringify({"success":"true"}));
});

module.exports = router;