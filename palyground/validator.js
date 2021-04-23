const router = require('express').Router()
const { check, validationResult } = require('express-validator')

router.get('/validator', (req, res, next) => {
    console.log('validator got called')
    res.render('playground/signup.ejs', { title: 'Signup Playground' })
})

router.post('/validator', 
    [
        check('username')
            .not()
            .isEmpty()
            .withMessage('Username cannot be empty')
            .isLength({ max: 15 })
            .withMessage('Username cannot be greater than 15 character'),
        check('email')
            .isEmail()
            .withMessage('Please provide a valid email'),
        check('password').custom(value => {
            if(value.length < 5){
                throw new Error('Paasword length is must be greater than 5 character')
            }
            return true
        }),
        check('confirmPassword').custom((value, {req}) => {
            if(value !== req.body.password){
                throw new Error('Password does not matched')
            }
            return true
        })
    ],
    (req, res, next) => {
    let errors = validationResult(req)

    const formatter = (error) => error.msg

    console.log(errors)
    console.log(errors.formatWith(formatter).mapped())
    res.render('playground/signup.ejs', { title: 'Signup Playground' })
})


module.exports = router