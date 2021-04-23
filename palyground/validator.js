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
            .withMessage('Please provide a valid email')
    ],
    (req, res, next) => {
    let errors = validationResult(req)

    const formatter = (error) => error.msg

    console.log(errors)
    console.log(errors.formatWith(formatter).mapped())
    res.render('playground/signup.ejs', { title: 'Signup Playground' })
})


module.exports = router