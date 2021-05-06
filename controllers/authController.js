const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')

const User = require('../models/User')
const errorFormatter = require('../utils/validationErrorFormatter')
const pageRenderer = require('../utils/pageRenderer')

exports.signupGetController = (req, res, next) => {
    pageRenderer(res = res, path = "pages/auth/signup", title = 'Create New Account', value = {})
}

exports.signupPostController = async (req, res, next) => {
    console.log(req.body)
    let { username, email, password, confirmPassword } = req.body
    let errors = validationResult(req).formatWith(errorFormatter)
    if (!errors.isEmpty()) {
        // res.render("pages/auth/signup", {title: 'Create New Account', error: errors.mapped(), value: {...req.body}})
        pageRenderer(
            res = res,
            path = "pages/auth/signup",
            title = 'Create New Account',
            error = errors.mapped(),
            value = { ...req.body }
        )
    }

    try {

        hashedPassword = await bcrypt.hash(password, 11)
        let user = new User({
            username, email, password: hashedPassword
        })

        let savedUser = await user.save()
        console.log(savedUser)
        pageRenderer(res = res, path = "pages/auth/signup", title = 'Create New Account')
    } catch (e) {
        console.log(e)
        next(e)
    }
}

exports.loginGetController = (req, res, next) => {
    console.log(req.session.isLoggedIn)
    return pageRenderer(res = res, path = 'pages/auth/login.ejs', title = 'Login to your account')
}

exports.loginPostController = async (req, res, next) => {
    let { email, password } = req.body
    let errors = validationResult(req).formatWith(errorFormatter)
    if (!errors.isEmpty()) {
        // res.render("pages/auth/signup", {title: 'Create New Account', error: errors.mapped(), value: {...req.body}})
        return pageRenderer(
            res = res,
            path = "pages/auth/login.ejs",
            title = 'Create New Account',
            error = errors.mapped(),
            value = { ...req.body }
        )
    }
    try {
        let user = await User.findOne({ email: email })
        if (!user) {
            res.json({ message: "Invalid Credentials" })
        }

        let match = bcrypt.compare(password, user.password)
        if (!match) {
            res.json({ message: "Invalid Credentials" })
        }
        req.session.isLoggedIn = true
        req.session.user = user
        req.session.save(err => {
            if(err){
                console.log(err)
                return next()
            }
            res.redirect('/dashboard')
        })

    } catch (e) {
        console.log(e)
        next(e)
    }
}

exports.logoutController = (req, res, next) => {
    req.session.destroy(err => {
        if(err){
            console.log(err)
            return next()
        }
        res.redirect('/auth/login')
    })
}