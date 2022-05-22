const Invoice = require('../models/invoice.model')

const { body, validationResult } = require('express-validator');
const path = require('path');
const mongoose = require('mongoose');
const sendMail = require('../utils/mail');
const ObjectId = mongoose.Types.ObjectId;



const invoices = Model => async (req,res)=>{
  try{
    console.log(Model)
    const allInvoices = await Model.find({});
    res.json(allInvoices);
  }
  catch(error){
    console.log(error);
    res.status.json({message:error.message});
  }
}

const create = Model => async (req, res) => {

  try {
    //  all field from req.body must be provided
    const { originalname, mimetype, destination, filename, path } = req.file;

    
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
  const invoices = await Model.find({
    user:new ObjectId(userId)
  });
  res.json(invoices);

}


// send payment email here

const  sendPaymentRequest = (message, to, from,)=>{

  console.log("payment request sent to vendor email adresss");
  
}

const paymentRequest = Model=> async (req, res)=>{

  try{
    
    const {invoice_number, _id, invoice_amount} = req.body;

    // update pamentsend field to true in db
    const doc = await Model.findOneAndUpdate({_id:_id},{payment_request:true},{new:true})
  
    if(doc && doc.payment_request){
      //sendPaymentRequest();
      sendMail("jyvenspierre@gmail.com","jyvenspierre@gmail.com",
               `Please Pay invoice# ${invoice_number}`,
               "Please pay this invoice", `<p>Please Pay invoice <b>${invoice_number}</b></p>`)
      

      res.json({success:true,message:"Payment request has been sent"})
    }
    else{
      return next('Unable to request Payment at This time');
    }
    


    
    
  }catch (error){
    
  }
  
  
}




module.exports = {
  create: create(Invoice),
  invoices: getInvoices(Invoice),
  all :invoices(Invoice),
paymentRequest :paymentRequest(Invoice)



}