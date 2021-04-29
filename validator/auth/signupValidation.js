
const { body } = require('express-validator')
const User = require('../../models/User')

module.exports = [
    body('username')
        .isLength({min: 2, max: 15})
        .withMessage('Username must be between 2 to 15 character')
        .custom(async username => {
            let user = await User.findOne({username})
            if(user){
                return Promise.reject('Username already exists!')
            }
        }).trim(),
    body('email')
        .isEmail()
        .withMessage('Please provide a valid email')
        .custom( async email => {
            let user = await User.findOne({email})
            if(user){
                return Promise.reject('Email already exists!')
            }
        }).normalizeEmail(),
    body('password')
        .isLength({min: 5})
        .withMessage('Password must be greater than 5 character'),
    body('confirmPassword')
        .not()
        .isEmpty()
        .withMessage('Confrirm password cannot be empty')
        .custom((value, {req}) => {
            if (value !== req.body.password){
                throw new Error('Password doesnot matched')
            }
            return true
        })

]