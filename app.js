
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const chalk = require('chalk')

const config = require('config');
const setRoutes = require('./routes/routes')
const setMiddleware = require('./middleware/middlewares')

const app = express()


// const DB_URI = `${process.env.DB_USER}://${process.env.DB_HOST}:27017/${process.env.DB_NAME}`
const DB_URI = `${config.get('DB_USER')}://${config.get('DB_HOST')}:27017/${config.get('DB_NAME')}`

app.get('env').toLowerCase() == 'development' && app.use(morgan('dev'))

// setMiddle ware
setMiddleware(app)

// set routers
setRoutes(app)

// ------------------- Play Ground Routers --------------
const setLocalsMiddleware = require('./middleware/setLocalsMiddleware')

// setup view engine
app.set('view engine', 'ejs')
app.set('views', 'views')



const PORT = process.env.PORT || 8080
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(chalk.green("DB connected"))
        app.listen(PORT, () => {
            console.log(chalk.green(`Server running on ${PORT}`))
        })
    })
    .catch(e => console.log(e))

