
const express = require('express');
const router = express.Router();
const company = require('../controllers/company.controller')

const { body, validationResult } = require('express-validator');


router.get('/:userId', company.getCompanyDetail);
router.post("/add", company.add);


module.exports = router;