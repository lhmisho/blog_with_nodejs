const router = require('express').Router()
const signupValidator = require('../validator/auth/signupValidation')
const loginValidator = require('../validator/auth/loginValidation')
const isUnAuthenticated = require('../middleware/isUnAuthenticatedMiddleware')

const { 
    signupGetController, 
    signupPostController,
    loginGetController,
    loginPostController,
    logoutController,
     
} = require('../controllers/authController')
const loginValidation = require('../validator/auth/loginValidation')

// auth routers
router.get('/signup', isUnAuthenticated, signupGetController)
router.post('/signup', signupValidator, signupPostController)
router.get('/login', isUnAuthenticated, loginGetController)
router.post('/login', loginValidation, loginPostController)
router.get('/logout', logoutController)

module.exports = router