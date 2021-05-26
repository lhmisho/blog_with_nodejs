const express = require('express')
const session = require('express-session')
const flash = require('connect-flash');
const MongoDBStore = require('connect-mongodb-session')(session)
const config = require('config');
// custom middlewares
const bindUserWithRequest = require('./authMiddleware')
const setLocals = require('./setLocalsMiddleware')

const DB_URI = `${config.get('DB_USER')}://${config.get('DB_HOST')}:27017/${config.get('DB_NAME')}`
var store = new MongoDBStore({
    uri: DB_URI,
    collection: 'sessions',
    expires: 1000 * 60 * 60 * 2
});


const middlewares = [
    express.static('public'),
    express.urlencoded({ extended: true }),
    express.json(),
    session({
        secret: config.get('SECRET_KEY') || 'SECRATE_KEY',
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 60 * 60 * 2 * 1000
        },
        store: store
    }),
    flash(),
    bindUserWithRequest(),
    setLocals()
]

module.exports = app => {
    middlewares.forEach(middleware => {
        app.use(middleware)
    })
}