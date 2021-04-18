
const express = require('express')
const morgan = require('morgan')
const app = express()

// setup view engine
app.set('view engine', 'ejs')
app.set('views', 'views')

// home roouter
app.get('/', (req, res) => {
    res.render('pages/auth/signup.ejs', {'title': 'Create a new account'})
})

// middleware array
const middleware = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({extended:true}) , // to accept form data
    express.json()  // to accept json data
]
app.use(middleware)




const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`)
})
    
