
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const CompanySchema = new mongoose.Schema({

  user :{ type:mongoose.Schema.Types.ObjectId, ref:'User', role:{type:String, default:"normal"}},
  inovices:[],

  

}, { timestamps: true })

//InvoiceSchema.index({invoice_number: 1, user: 1}, {unique: true});
const Company = mongoose.model("Company", CompanySchema);
module.exports = Company;