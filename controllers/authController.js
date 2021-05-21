const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')

const User = require('../models/User')
const errorFormatter = require('../utils/validationErrorFormatter')
const pageRenderer = require('../utils/pageRenderer')

exports.signupGetController = (req, res, next) => {
    pageRenderer(res = res, path = "pages/auth/signup", title = 'Create New Account', value = {})
}

exports.signupPostController = async (req, res, next) => {
    let { username, email, password, confirmPassword } = req.body
    let errors = validationResult(req).formatWith(errorFormatter)

    req.flash('fail', 'Please check your form')
    if (!errors.isEmpty()) {
        // res.render("pages/auth/signup", {title: 'Create New Account', error: errors.mapped(), value: {...req.body}})
        pageRenderer(
            req=req,
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

        await user.save()
        redirect('/auth/login')
    } catch (e) {
        console.log(e)
        next(e)
    }
}

exports.loginGetController = (req, res, next) => {
    return pageRenderer(req = req, res = res, path = 'pages/auth/login.ejs', title = 'Login to your account')
}

exports.loginPostController = async (req, res, next) => {
    let { email, password } = req.body
    let errors = validationResult(req).formatWith(errorFormatter)
    if (!errors.isEmpty()) {
        req.flash('fail', 'Please check your form')
        // res.render("pages/auth/signup", {title: 'Create New Account', error: errors.mapped(), value: {...req.body}})
        return pageRenderer(
            req = req,
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
            req.flash('fail', 'Invalid Credentials')
            return pageRenderer(
                req = req,
                res = res,
                path = "pages/auth/login.ejs",
                title = 'Login to your Account',
                error = {},
                value = { ...req.body }
            )
        }

        let match = bcrypt.compare(password, user.password)
        if (!match) {
            req.flash('fail', 'Invalid Credentials')
            return pageRenderer(
                req = req,
                res = res,
                path = "pages/auth/login.ejs",
                title = 'Login to your Account',
                error = {},
                value = { ...req.body }
            )
        }
        req.session.isLoggedIn = true
        req.session.user = user
        req.session.save(err => {
            if(err){
                console.log(err)
                return next()
            }
            req.flash('success', 'Successfully Logedin')
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
        req.flash('success', 'Successfully logged out')
        res.redirect('/auth/login')
    })
}