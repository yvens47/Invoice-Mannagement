const User = require('../models/user.model')

//const { body, validationResult } = require('express-validator');

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


const update = Model => async (req, res)=>{

  try{
    const {userId} = req.body;
    const updateUser = Model.findOneAndUpdate({_id:userId},req.body,{new:true});   
    
  }catch(error){
    console.log(error);
    res.json({message:error.message});
               
    
  }
}




module.exports = {
  update :update(User)
 



}