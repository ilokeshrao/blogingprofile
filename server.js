const express = require('express')
const app = express()
app.use(express.urlencoded({ extended: false }))
require('dotenv').config()
const adminrouter = require('./router/adminrouter')
const frontedrouter = require('./router/frontedrouter')
const session = require('express-session')
const { default: mongoose } = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/backendprojectsecond')

app.use(session({
   secret: 'lokesh',
   resave: false,
   saveUninitialized: false
}))

app.use(frontedrouter)
app.use('/admin', adminrouter)
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.listen(process.env.PORT, () => { console.log(`server is run  port ${process.env.PORT}`) })