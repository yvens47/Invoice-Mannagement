

const login = Model =>(req, res)=>{

  const {email, password} = req.body

  try {
     res.json({login:"Login Controller"})    
  }
  catch(e){

    console.log(e);
    
  }

 
  
}

const register = Model =>(req, res)=>{

  res.json({login:"Login Controller"})
  
}

const forgotPassword = Model =>(req, res)=>{

  res.json({login:"Login Controller"})
  
}

const isAuthorized = (req, res)=>{

  res.json({login:"Login Controller"})
  
}





module.exports ={
  login:login({}),
  register:register({}),
  isAuthorized,
  forgotPassword:forgotPassword({})
  
  
}