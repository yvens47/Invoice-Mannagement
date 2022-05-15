const express = require('express');
const http = require('http')
const socketIO = require('socket.io')
const app = express();
const server = http.createServer(app);
const io = socketIO(server,{cors: {
    // origin: '*',
  origin: 'https://invoice-mannagement-front.jeanpierre34.repl.co/',
  }});
const morgan = require('morgan')
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParse = require('cookie-parser');
require('dotenv').config();
const db = require('./utils/db');
var Client = require("dwolla-v2").Client;
const axios = require('axios');
// socket


const AuthRoute = require('./routes/auth');
const InvoiceionRoute = require('./routes/invoice');
const PORT = process.env.PORT || 5000;


app.use(morgan('tiny'))
app.use(cors(
  {
    // origin: 'https://invoice-mannagement-front.jeanpierre34.repl.co/',
    origin:"*",
    credentials: true,
}
  
))
app.use(cookieParse());
app.use(express.json());
app.use(bodyParser());
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: false
}));

db();
// routes
app.use("/auth", AuthRoute);
app.use("/invoices", InvoiceionRoute);


app.get('/', (req, res) => {
  res.json({ message: "Invoice Management Systems" });
})



const appKey = process.env['APPKEY'] || "ogtqvboyH8K9ELC668XcwIYYY0jH4YNgL6uGcrPh1JBAmqML8I";

const appSecret = process.env['APPSECRET'] || "MaWhk2UyAaoOyKJ6btgw6NZI9wMen1OmaFBqkSgGVEKwZuRF1Y";


var dwolla = new Client({
  key: appKey,
  secret: appSecret,
  environment: "sandbox", // defaults to 'production'
});

// console.log(dwolla);




app.post('/token', async (req, res, next) => {
  // GET api.dwolla.com/customers?limit=10&offset=20
   dwolla
  .post("customers", {
    firstName: "Janex",
    lastName: "Doge",
    email: "januec@doe.com",
  })
  .then((res) => console.log(res));

})
io.on("connection", (socket) => {
  console.log("new user connected..")
  // ...
  socket.emit("Welcome", "Hello from server IO")

  socket.on("login", (arg) => {
    console.log(arg); // world
  });
  socket.on('Invoice_Uploaded', (args)=>{
    console.log("an Invoice has been uploaded").
    socket.emit("uploaded", ['data']);
  })
});

// io.


server.listen(PORT, () => console.log("App has started..."))



