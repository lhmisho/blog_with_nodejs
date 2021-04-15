
const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(morgan('dev'))
app.use(express.urlencoded({extended:true}))  // to accept form data
app.use(express.json())  // to accept json data




const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log('Server is running at')
})
    
