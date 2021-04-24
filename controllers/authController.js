const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')

const User = require('../models/User')
const errorFormatter = require('../utils/validationErrorFormatter')

exports.signupGetController = (req, res, next) => {
    res.render("pages/auth/signup", {title: 'Create New Account'})
}

exports.signupPostController = async (req, res, next) => {
    console.log(req.body)

    let errors = validationResult(req).formatWith(errorFormatter)
    if(!errors.isEmpty()){
        return console.log(errors.mapped())
    }

    let { username, email, password, confirmPassword} = req.body
    
    try{

        hashedPassword = await bcrypt.hash(password, 11)
        let user = new User({
            username, email, password: hashedPassword
        })

        let savedUser = await user.save()
        console.log(savedUser)
        res.render("pages/auth/signup", {title: 'Create New Account'})
    }catch(e){
        console.log(e)
        next(e)
    }
}

exports.loginGetController = (req, res, next) => {
    res.render('pages/auth/login.ejs', {title: 'Login to your account'})
}

exports.loginPostController = async (req, res, next) => {
    let { email, password } = req.body

    try{
        let user = await User.findOne({email: email})
        if(!user){
            res.json({message: "Invalid Credentials"})
        }

        let match = bcrypt.compare(password, user.password)
        if(!match){
            res.json({message: "Invalid Credentials"})
        }
        console.log('Logged in user', user)
        res.render('pages/auth/login.ejs', {title: 'Login to your account'})

    }catch(e){
        console.log(e)
        next(e)
    }


}

exports.logoutController = (req, res, next) => {

}