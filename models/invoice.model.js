
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const InvoiceSchema = new mongoose.Schema({

  user :{ type:mongoose.Schema.Types.ObjectId, ref:'User'},
   

  invoice_number:{type:String, required:[true, "Invoice Number is required"], unique:true},
  invoice_amount: {type:Number, required:[true, " Number is required"]},
  
  upload_date :Date,
  invoice_image:{type:String, required:[true, "Invoice is required"]},
  paid: Boolean,
  payment_request:{type:Boolean, default:false}
  

}, { timestamps: true })

InvoiceSchema.index({invoice_number: 1, user: 1}, {unique: true});
const Invoice = mongoose.model("Invoice", InvoiceSchema);
module.exports = Invoice;