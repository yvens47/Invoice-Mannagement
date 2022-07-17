
const express = require('express');
const router = express.Router();
const InvoiceController = require('../controllers/invoice.controller')
const Auth = require('../controllers/auth.controller')
const multer = require('multer')
const path = require('path');
const { route } = require('./company');
//const upload = multer({ dest: './public/uploads/' })

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
});
const upload = multer({ storage: storage })

//const { body, validationResult } = require('express-validator');


router.get('/', (req, res) => {
  res.json({ message: "display all invoices" })
})

//router.post('/', Auth.isAuthorized,InvoiceController.create);

// user must be  authorize to create and read invoice
router.post('/', Auth.isAuthorized, upload.single('file'), InvoiceController.create);

router.get("/:userId", InvoiceController.invoices)
router.post('/delete', (req, res) => {

  const { invoice_number, userId } = req.body;
  // 
  res.json({ message: "Delete Invoice not yet Implemented" })

})
router.put('/payment-request', InvoiceController.paymentRequest);



module.exports = router;