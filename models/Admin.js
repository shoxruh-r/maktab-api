const { Schema, model } = require('mongoose')


const schema = new Schema({
    login: String,
    password: String
}, { collection: 'admins' })


module.exports = model('Token', schema)
