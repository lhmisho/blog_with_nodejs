
const { body } = require('express-validator')
const User = require('../../models/User')

module.exports = [
    body('email')
        .isEmail()
        .withMessage('Please provide a valid email'),
    body('password')
        .not()
        .isEmpty()
        .withMessage('Password field cannot be empty')

]