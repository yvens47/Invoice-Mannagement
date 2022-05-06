
const express = require('express');
const router = express.Router();
const InvoiceController = require('../controllers/invoice.controller')
const Auth = require('../controllers/auth.controller')

//const { body, validationResult } = require('express-validator');



//router.post('/', Auth.isAuthorized,InvoiceController.create);


router.post('/',InvoiceController.create);

router.get('/',()=>{
  
});



module.exports = router;