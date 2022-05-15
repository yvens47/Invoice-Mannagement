
const express = require('express');
const router = express.Router();
const InvoiceController = require('../controllers/invoice.controller')
const Auth = require('../controllers/auth.controller')
const multer  = require('multer')
const path = require('path')
//const upload = multer({ dest: './public/uploads/' })

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix+path.extname(file.originalname))
  }
});
const upload = multer({ storage: storage })

//const { body, validationResult } = require('express-validator');



//router.post('/', Auth.isAuthorized,InvoiceController.create);


router.post('/',Auth.isAuthorized,upload.single('file'), InvoiceController.create);
router.get("/:userId", InvoiceController.invoices)

// router.get('/',()=>{
  
// });



module.exports = router;