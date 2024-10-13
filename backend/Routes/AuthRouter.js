const { signup, login  } = require('../Controller/AuthController');
const {   signupValidator, loginValidator} = require('../midlleweres/AuthValidation'); // Fixed typo in the 'middlewares' path
const router = require('express').Router(); // Added missing parentheses

router.post('/login', loginValidator, login );
// Add the signup 
router.post('/signup', signupValidator, signup);

module.exports = router;
 