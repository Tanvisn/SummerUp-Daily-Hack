const mongoose = require('mongoose');
require('mongoose-type-email');
const bcrypt = require('bcrypt');

const diarySchema = mongoose.Schema({
  key: Number,
  date: String,
  title: String,
  text: String
});

const shoppingSchema = mongoose.Schema({
  _id: Number,
  key: Number,
  title: String,
  content: Object
});

const appointmentsSchema = new mongoose.Schema({
  _id: String,
  key : String,
  title: String,
  body: String,
  year: String,
  month: String,
  date: String,
  hour: String,
  minutes: String,
  seconds: String,
  done: Boolean,
  nameOfDoc: String,
  medicalSpeciality: String,
  address: String,
  phoneNumber: Number
});

const specialEventsSchema = new mongoose.Schema({
  _id: String,
  key : String,
  title: String,
  body: String,
  year: String,
  month: String,
  date: String,
  hour: String,
  minutes: String,
  seconds: String,
  done: Boolean,
  eventName: String,
  description: String
});

const eventsSchema = new mongoose.Schema({
  _id: String,
  key : String,
  title: String,
  body: String,
  year: String,
  month: String,
  date: String,
  hour: String,
  minutes: String,
  seconds: String,
  done: Boolean,
  eventName: String,
  description: String
});

const measurementSchema = new mongoose.Schema({
  _id: String,
  key : String,
  title: String,
  body: String,
  start_year: String,
  start_month: String,
  start_date: Number,
  end_year: String,
  end_month: String,
  end_date: Number,
  hour: String,
  minutes: String,
  seconds: String,
  typeOfMeasurement: String,
  description: String,
  value: Number,
  unit: String,
  done: Boolean,
  datesArray: [Object],
  startDate: String,
  endDate: String
});

const medicinesSchema = new mongoose.Schema({
  _id: String,
  key : String,
  title: String,
  body: String,
  start_year: String,
  start_month: String,
  start_date: Number,
  end_year: String,
  end_month: String,
  end_date: Number,
  hour: String,
  minutes: String,
  seconds: String,
  name: String,
  description: String,
  done: Boolean,
  datesArray: [Object],
  startDate: String,
  endDate: String
});

const notes = new mongoose.Schema({
  _id: String,
  key: String,
  title: String,
  date: String,
  time: String,
  yourNotes: String
});

const inventorySchema = new mongoose.Schema({
  _id: String,
  key : String,
  nameOfMedicine: String,
  totalPills: Number,
  pillsInOneDose: Number,
  remindWhen: Number
});

const transSchema = mongoose.Schema({
  _id: String,
  key: String,
  pieKey: String,
  type: String,
  cost: Number,
  purpose: String,
  description: String,
  time: String,
  method: String
});

const feedbackSchema = mongoose.Schema({
  _id : String,
  userName : String,
  date : String,
  comments : String,
  rating : Number
});
const expenseSchema = mongoose.Schema({
    _id : String,
    date : String,
    month : String,
    contents : [transSchema]
});

const listSchema = mongoose.Schema({
    _id : String,
    work : String,
    checked : Boolean
});

const dataSchema = mongoose.Schema({
    _id : String,
    date : String,
    timer : Number
});

const fitnessSchema = mongoose.Schema({
//    list : [listSchema],
//    data : [dataSchema]
    _id : Number,
    key : Number,
    date : String,
    list : Object 
});

const userSchema = new mongoose.Schema({
    email: {
        type: mongoose.SchemaTypes.Email,
        unique: [true, "This email is already used!"],
        required: [true, "Email field is required!"]
    },
    password: {
        type: String,
        required: [true, "Email field is required!"]
    },
    userName: {
        type: String,
        unique: [true, "This username is already used!"],
        required: [true, "Username field is required!"]
    },
    fName: {
        type: String,
        required: [true, "First Name field is required!"]
    },
    lName: {
        type: String,
        required: [true, "Last Name field is required!"]
    },
    age: {
        type: Number,
        required: [true, "Age field is required!"]
    },
    diary : [diarySchema],
    shopping : [shoppingSchema],
    expense : [expenseSchema],
    fitness : [fitnessSchema],
    appointments :[appointmentsSchema],
    measurement: [measurementSchema],
    medicines: [medicinesSchema],
    inventory: [inventorySchema],
    specialEvents: [specialEventsSchema],
    events: [eventsSchema],
    notes: [notes],
    feedback : [feedbackSchema]
});

userSchema.pre('save' , function(next) {
    const user = this;
    //If password is hashed then return without hashing.

    if(!user.isModified('password'))
    {
        return next();
    }

    bcrypt.genSalt(10 , (err , salt) => {
        if(err)
        {
            return next(err);
        }
        bcrypt.hash(user.password , salt , (err , hash) => {
            if(err)
            {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});


userSchema.methods.comparePassword = function(candidatePassword) {
    const user = this;
    //Checks whether the password given by the user is correct or not.

    return new Promise((resolve , reject) => {
        bcrypt.compare(candidatePassword , user.password , (err , isMatch) => {
            if(err)
            {
                return reject(err);
            }
            if (!isMatch)
            {
                return reject(err);
            }
            resolve(true);
        });
    });
}

mongoose.model('User',userSchema);