const express = require('express')
const { connect } = require('mongoose')
const cors = require('cors')
require('dotenv').config()


const { DB_URI } = process.env
connect(DB_URI)
    .then(() => {
        console.log("Baza ulandi!")
    })


const app = express()


app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.use('/api', require('./routes'))


app.use(express.static('public'))


app.listen(3000, () => {
    console.log("Server bu manzilda ishga tushdi: http://localhost:3000/")
})
