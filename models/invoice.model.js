
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Company = require('./company.model');


const InvoiceSchema = new mongoose.Schema({

  user: { type: mongoose.Schema.Types.ObjectId },
  company_id: { type: mongoose.Schema.Types.ObjectId },
  invoice_number: { type: String, required: [true, "Invoice Number is required"] },
  invoice_amount: { type: Number, required: [true, " Number is required"] },
  upload_date: { type: Date, default: Date.now() },
  invoice_image: { type: String, required: [true, "Invoice is required"] },
  paid: { type: Boolean, default: false },
  payment_request: { type: Boolean, default: false }


}, { timestamps: true })

//InvoiceSchema.index({invoice_number: 1, user: 1}, {unique: true});
const Invoice = mongoose.model("Invoice", InvoiceSchema);
module.exports = Invoice;