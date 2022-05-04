const mongoose = require('mongoose')


function connect(){

  const uri = `${process.env.URI}`;
  console.log(uri);

 
try {
   mongoose.connect('mongodb+srv://jyvenspierre:yvenstij43gt@cluster0.sjcbu.mongodb.net/invoice?retryWrites=true&w=majority',{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = connect;