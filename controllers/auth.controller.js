
const User = require('../models/user.model')

const login = Model =>(req, res)=>{

  const {email, password} = req.body
  // no empty email and password



  try {
     res.json({email, password})   ; 
  }
  catch(e){

    console.log(e);
    
  }

 
  
}

const register = Model =>(req, res)=>{

  try{
    

    res.json({login:"register Controller"})
  }
  catch(e){
    console.log(e)
  }

  
  
}

const forgotPassword = Model =>(req, res)=>{

  res.json({login:"Login Controller"})
  
}

const isAuthorized = (req, res)=>{

  res.json({login:"Login Controller"})
  
}





module.exports ={
  login:login(User),
  register:register(User),
  isAuthorized,
  forgotPassword:forgotPassword({})
  
  
}