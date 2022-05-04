
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const UserSchema = new mongoose.Schema({
  email: { type: String,unique: true, required: [true, "email is required"] },
  password: { type: String, minLength: [8, "password must be 8 Characters or More."] },
  first_name: { type: String, required: [true, "First name is required"] },
  last_name: { type: String, required: [true, "Last name is required"] },
  profile:{type:String},
  company:{type:String}
  
  

}, { timestamps: true })

const User = mongoose.model("User", UserSchema);
module.exports = User;