const router = require('express').Router()
const { check, validationResult } = require('express-validator')
const flash = require('../utils/Flash')

router.get('/validator', (req, res, next) => {
    console.log(flash.getMessage(req))
    res.render('playground/signup.ejs', { title: 'Signup Playground' })
})

router.post('/validator',
    [
        check('username')
            .not()
            .isEmpty()
            .withMessage('Username cannot be empty')
            .isLength({ max: 15 })
            .withMessage('Username cannot be greater than 15 character')
            .trim(),
        check('email')
            .isEmail()
            .withMessage('Please provide a valid email')
            .normalizeEmail(),
        check('password').custom(value => {
            if (value.length < 5) {
                throw new Error('Paasword length is must be greater than 5 character')
            }
            return true
        }),
        check('confirmPassword').custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Password does not matched')
            }
            return true
        })
    ],
    (req, res, next) => {
        let errors = validationResult(req)

        const formatter = (error) => error.msg
        if(!errors.isEmpty()){
            req.flash('fail', 'Some error occured')
        }else{
            req.flash('success', 'No error occured')
        }
        res.redirect('/playground/validator')
    })


module.exports = router