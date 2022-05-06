
const express = require('express');
const router = express.Router();
const Auth = require('../controllers/auth.controller')

const { body, validationResult } = require('express-validator');



router.post('/login',Auth.login);

router.post('/register',body('email').isEmail(),
  // password must be at least 5 chars long
  body('password').isLength({ min: 8 }).withMessage("Password should be at least 8 characters"),
            Auth.register);
router.get('/logout', Auth.logout);



module.exports = router;