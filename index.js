const express = require('express');

const app = express();
const morgan = require('morgan')
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const db = require('./utils/db');


const AuthRoute = require('./routes/auth')
console.log(AuthRoute)

const PORT  = process.env.PORT || 5000;


app.use(morgan('tiny'))
app.use(cors())
app.use(bodyParser());

db();
// routes
app.use("/auth",AuthRoute);

app.get('/', (req, res)=>{
  res.json({message:"Invoice Management Systems"});
})








app.listen(PORT, ()=>console.log("App has started..."))



