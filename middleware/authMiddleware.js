let User = require('../models/User')


module.exports = () => {
    return async (req, res, next) => {
        if(!req.session.isLoggedIn){
            return next()
        }

        try{
            let user = await User.findOne(req.session.user._id)
            req.user = user
            next()
        }catch(e){
            console.log(e)
            next(e)
        }
    }
}