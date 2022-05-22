
const User = require('../models/user.model')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var Client = require("dwolla-v2").Client;
const sendMail = require('../utils/mail')

const appKey = process.env['APPKEY'] || "ogtqvboyH8K9ELC668XcwIYYY0jH4YNgL6uGcrPh1JBAmqML8I";

const appSecret = process.env['APPSECRET'] || "MaWhk2UyAaoOyKJ6btgw6NZI9wMen1OmaFBqkSgGVEKwZuRF1Y";


var dwolla = new Client({
  key: appKey,
  secret: appSecret,
  environment: "sandbox", // defaults to 'production'
});



// login user in
const login = Model => async (req, res) => {

  const { email, password } = req.body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // no empty email and password
  try {
    // find user by email
    const user = await Model.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Email does not exist" });
    }
    // compare password against db->password    
    if (! await bcrypt.compare(password, user.password)) {
      return res.status(400).json({ success: false, message: "Email and/or password is incorrect" });
    }
    // create token    
    const token = jwt.sign({ userid: user._id }, process.env.JWT || "secret", { expiresIn: '7d' });
    const expiryDate = new Date(Date.now() + 60 * 60 * 24 * 1000) // 24 hour
    res.cookie('my_token', token,
      {
        expires: expiryDate,
        httpOnly: true,
        secure: true,
      });
    user.password = null;
    res.json({ success: true, token, message: "Yo have logged in successfully", user });
  }
  catch (e) {

    console.log(e);
    res.status(400).json({ message: "Could not log you in at this time" });

  }



}
// user registration
const register = Model => async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {

    //
    // dwolla

    /*    const {email, first_name, last_name} = req.body;
    const newCustomer =  await dwolla
    .post("customers", {
      firstName: first_name,
      lastName: last_name,
      email: email,
    })
      const idArr = newCustomer.headers.get('location').split('/');
      const CustomerId = (idArr[4]);
  */

    // create and save new user
    const user = new Model(req.body);
    // user.customer_id = CustomerId;
    user.save(function(err) {
      if (err)
        res.status(400).json({ success: false, error: err.message });
      res.json({ success: true, message: "You have registered successfully" })

    });
  }
  catch (e) {
    console.log(e)
    res.status(400).json({ success: false, message: "Unable to register you at this time" })
  }



}

//  logout
logout = async (req, res) => {
  // destroy cookie
  res.clearCookie("my_token");

  res.json({
    message: "signed out"
  });
};

// help user get new password
const forgotPassword = Model => async (req, res) => {
  // 

  try {
   


    // is the user exist
    const user = await Model.findOne({ email: req.params.email }).exec();
    if (!user)
      return res.json({ success: false, message: "User does not exist. please register." })
    

    //  create a random password
    var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var password = generatePassword(chars);
    user.password = password;

    // 

    user.save((error) => {
      if (error) {        
        res.json({ success: false, message: "We are unable to provide you with a new password at this time. Sorry!" })
      }
      

      // email passowrd to user
      sendMail("jyvenspierre@gmail.com", req.params.email, "Temporary Password", `Here is Your temporary password ${password}`, `Here is Your temporary password ${password}`);

      res.json({ success:true, message: "A temporary password was sent to your email." });
    });


  }
  catch (e) {
    console.log(e);
    res.json(e)
  }


}


//  check if user is authorized with provided token
const isAuthorized = (req, res, next) => {


  let my_token = req.headers.authorization.split(' ')[1];
 
  

  jwt.verify(my_token, process.env.JWT || "secret", (error, verifiedToken) => {
    if (error) {
     
      res.json(error.message);

    }

    next();


  });



}
const changePassword = Model => async (req, res) => {
  const { id, newPassword, currentPassword } = req.body;
  console.log(id);
  try {
    const findUser = await Model.findOne({_id:id});
   
    if(!findUser)
      return res.status(401).json({message:"User does not exist"});
    console.log(findUser.password);
    console.log("Current ", currentPassword)

     const BcryptPassword =await bcrypt.compare(currentPassword, findUser.password);
    console.log(BcryptPassword)
    // current password must match user's password
    if(!BcryptPassword)
        return res.status(401).json({message:"You must provide your current password"})
        

    // update password here and save to db 
    // hashing is done on save
    findUser.password = newPassword;
    
    findUser.save((error) => {
      if (error) {
       
        return res.status(401).json({message: "Unable to save Password" })
      }
      res.json({ success:true, message: "Your Password has been updated." });
    });

    



  }
  catch (error) {
    console.log(error)
    res.status(401).json({ message: error.message, code: error.code });
  }
}






module.exports = {
  login: login(User),
  register: register(User),
  logout,
  isAuthorized,
  changePassword:changePassword(User),

  forgotPassword: forgotPassword(User)


}

function generatePassword(chars) {
    var passwordLength = 8;
    var password = "";
    for (var i = 0; i <= passwordLength; i++) {
        var randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
    }
    return password;
}
