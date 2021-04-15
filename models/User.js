const { Schema, model } = require('mongoose')
const Profile = require('./Profile')


const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 30
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: true,
        required: true
    },
    profile: {
        type: Schema.Types.ObjectId,
        ref: Profile
    }
}, {
    timestamps: true
})

const User = model('User', userSchema)
module.exports = User