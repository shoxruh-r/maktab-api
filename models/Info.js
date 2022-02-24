const { Schema, model } = require('mongoose')


const schema = new Schema({
    info: String
}, { collection: 'info' })


module.exports = model('Info', schema)
