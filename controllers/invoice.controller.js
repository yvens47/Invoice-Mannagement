const Invoice = require('../models/invoice.model')

const { body, validationResult } = require('express-validator');
const path = require('path');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


const create = Model => async (req, res) => {

  try {
    //  all field from req.body must be provided
    const { originalname, mimetype, destination, filename, path } = req.file;
  

    console.log(req.headers);
    console.log(req)
    
    // if so error user from c
    const {invoice_number, userid} = req.body

    //  find invoice by id and user    
    const invoiceFound = await Model.findOne({
      invoice_number:invoice_number, user:new ObjectId(userid)
    })
 
    if (invoiceFound) {
      //also delete ffile that was uploaded. [ not yet implemented]     
      res.json({success:false, message:"No Duplicate invoice is allowed"})
    }
    const image_path = path.split('/')[1]+"/"+filename  
    // continue upload voice
    const invoice = new Model({
      ...req.body, invoice_image: image_path, upload_date
        : Date.now()
    });

    invoice.save((error) => {
      console.log(error);
      if (error) return res.json({ error });      
      res.json({ success: true, message: "Your invoice has been created successfully" });

    })

  }

  catch (e) {

  }



}

// belongs to a company user
const getInvoices = Model => async (req, res) => {

  // const {userId}= req.params;
  const {userId} = req.params
  console.log(req.params);
  

  const invoices = await Model.find({
    user:new ObjectId(userId)
  });
  res.json(invoices);

}






module.exports = {
  create: create(Invoice),
  invoices: getInvoices(Invoice)



}