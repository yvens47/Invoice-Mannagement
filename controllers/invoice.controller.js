const Invoice = require('../models/invoice.model')
const { body, validationResult } = require('express-validator');

//const bcrypt = require('bcrypt');
//const jwt = require('jsonwebtoken');
//var Client = require("dwolla-v2").Client;
const create = Model => (req, res)=>{

  //  all field from req.body must be provided
  

  // process Image  and save the path to db
  
  
  const invoice = new Model(req.body);
  
  
  invoice.save((error,document)=>{
    if(error){
      console.log(error)
      if(error.code ===11000){
        return res.status(404).json({message:"Invoice number already Added"})
      }
       return res.status(404).json({message:"Could not save Invoice"})
    }
     

    res.json({success:true, message:"Your invoice has been created successfully"});
  })


  
}



module.exports = {
  create: create(Invoice),
  


}