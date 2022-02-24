const express = require('express')
const cors = require('cors')
require('dotenv').config()


const app = express()


app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.use('/api', require('./routes'))


app.use(express.static('public'))


app.listen(3000, () => {
    console.log("Server bu manzilda ishga tushdi: http://localhost:3000/")
})
