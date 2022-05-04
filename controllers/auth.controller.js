
const User = require('../models/user.model')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = Model => async(req, res) => {

  const { email, password } = req.body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // no empty email and password
  try {
    // find user by email
    const user = await  Model.findOne({email});
   
    
    if(!user){      
       return res.status(400).json({ success:false,message: "Email does not exist" });      
    }     

    // compare password against db->password
    
    if(! await bcrypt.compare(password, user.password)){
       return res.status(400).json({success:false, message:"Email and/or password is incorrect"});
    } 
    // create token
    console.log(process.env.JWT)
    const token = jwt.sign({userid:user._id}, process.env.JWT||"secret", {expiresIn:'7d'});
    console.log(token);
    const expiryDate = new Date(Date.now() + 60 * 60 * 24 *7 *1000) // 24 hour
    res.cookie('my_token', token,
      {
        expires: expiryDate,
        httpOnly: true,
        // secure: true,
      });
    user.password = null;
    
    res.json({ success:true, token, message:"Yo have logged in successfully", user});
  }
  catch (e) {

    console.log(e);
    res.status(400).json({message:"Could not log you in at this time"});

  }



}

// user registration
const register = Model => (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {

    // create and save new user
    const user = new Model(req.body);
    user.save(function(err) {
      if (err)
        res.status(400).json({success:false, error: err.message });
      //
      res.json({ success: true, message: "You have registered successfully" })

    });
  }
  catch (e) {
    console.log(e)
    res.status(400).json({success:false, message:"Unable to register you at this time"})
  }



}

const forgotPassword = Model => (req, res) => {

  res.json({ login: "Login Controller" })

}

const isAuthorized = (req, res) => {

  res.json({ login: "Login Controller" })

}





module.exports = {
  login: login(User),
  register: register(User),
  isAuthorized,
  forgotPassword: forgotPassword({})


}