
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const session = require('express-session')
const mongoose = require('mongoose')
const MongoDBStore = require('connect-mongodb-session')(session)
const chalk = require('chalk')
const flash = require('connect-flash');
const config = require('config');

// routes
const authRoutes = require('./routes/authRouts')
const dashboardRoutes = require('./routes/dashboardRouts')

const app = express()

// middlewares
const bindUserWithRequest = require('./middleware/authMiddleware')
const serLocals = require('./middleware/setLocalsMiddleware')



const DB_URI = `${process.env.DB_USER}://${process.env.DB_HOST}:27017/${process.env.DB_NAME}`
var store = new MongoDBStore({
    uri: DB_URI,
    collection: 'sessions',
    expires: 1000 * 60 * 60 * 2
});
// home roouter

// middleware array
app.get('env').toLowerCase() == 'development' && app.use(morgan('dev'))
console.log(app.get('env'))
const middleware = [
    express.static('public'),
    express.urlencoded({ extended: true }),
    express.json(),
    session({
        secret: process.env.SECRET_KEY || 'SECRATE_KEY',
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 60 * 60 * 2 * 1000
        },
        store: store
    }),
    bindUserWithRequest(),
    serLocals(),
    flash()
]

console.log(process.env.NODE_ENV)
console.log(config.get('name'))
app.use(middleware)

// ------------------- Play Ground Routers --------------
// TODO: should be remove
const validatorRoutes = require('./palyground/validator')
const setLocalsMiddleware = require('./middleware/setLocalsMiddleware')

// setup view engine
app.set('view engine', 'ejs')
app.set('views', 'views')

app.use('/auth', authRoutes)
app.use('/dashboard', dashboardRoutes)
app.use('/playground', validatorRoutes) // TODO: should be remove

app.get('/', (req, res) => {
    res.render('pages/auth/signup.ejs', { 'title': 'Create a new account' })
})


const PORT = process.env.PORT || 8080
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(chalk.green("DB connected"))
        app.listen(PORT, () => {
            console.log(chalk.green(`Server running on ${PORT}`))
        })
    })
    .catch(e => console.log(e))

