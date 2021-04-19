
const express = require('express')
const morgan = require('morgan')
const authRoutes = require('./routes/authRouts')
const mongoose = require('mongoose')
const chalk = require('chalk')
const app = express()

// home roouter

// middleware array
const middleware = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({ extended: true }),
    express.json()
]
app.use(middleware)

// setup view engine
app.set('view engine', 'ejs')
app.set('views', 'views')

app.use('/auth', authRoutes)
app.get('/', (req, res) => {
    res.render('pages/auth/signup.ejs', {'title': 'Create a new account'})
})

const DB_URI = 'mongodb://localhost:27017/blog'
const PORT = process.env.PORT || 8080
mongoose.connect(DB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log(chalk.green("DB connected"))
        app.listen(PORT, () => {
            console.log(chalk.green(`Server running on ${PORT}`))
        })        
    })
    .catch(e => console.log(e))
    
