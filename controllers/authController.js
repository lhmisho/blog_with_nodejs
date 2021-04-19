const bcrypt = require('bcrypt')
const User = require('../models/User')

exports.signupGetController = (req, res, next) => {
    res.render("pages/auth/signup", {title: 'Create New Account'})
}

exports.signupPostController = async (req, res, next) => {
    console.log(req.body)
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

}

exports.loginPostController = (req, res, next) => {

}

exports.logoutController = (req, res, next) => {

}