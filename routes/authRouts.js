const router = require('express').Router()
const signupValidator = require('../validator/auth/signupValidation')
const loginValidator = require('../validator/auth/loginValidation')

const { 
    signupGetController, 
    signupPostController,
    loginGetController,
    loginPostController,
    logoutController,
     
} = require('../controllers/authController')
const loginValidation = require('../validator/auth/loginValidation')

// auth routers
router.get('/signup', signupGetController)
router.post('/signup', signupValidator, signupPostController)
router.get('/login', loginGetController)
router.post('/login', loginValidation, loginPostController)
router.get('/logout', logoutController)

module.exports = router