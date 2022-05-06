
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const UserSchema = new mongoose.Schema({
  email: { type: String,unique: true, required: [true, "email is required"] },
  password: { type: String, minLength: [8, "password must be 8 Characters or More."] },
  first_name: { type: String, required: [true, "First name is required"] },
  last_name: { type: String, required: [true, "Last name is required"] },
  profile:{type:String},
  company:{type:String},
  customer_id:String,
  payment_set: Boolean
  
  
  

}, { timestamps: true })

UserSchema.pre('save', async function(next){
  if(!this.isModified('password'))
    return next();
   this.password = await bcrypt.hash(this.password, 12);
    
})

const User = mongoose.model("User", UserSchema);
module.exports = User;