
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const CompanySchema = new mongoose.Schema({

  // user :{ type:mongoose.Schema.Types.ObjectId, ref:'User', role:{type:String, default:"normal"}},
 
  inovices:[],
  users:{type:Array, default:[]},
  name:{type:String, required:[true,"Company name is required"]},
  address:{type:{},default:null},
  balance:{type:String, default:'0.00'},
  email:{type:String, required:[true,"Email is required"]},
  about:{type:String, default:""}
  

  

}, { timestamps: true })

//InvoiceSchema.index({invoice_number: 1, user: 1}, {unique: true});
const Company = mongoose.model("Company", CompanySchema);
module.exports = Company;