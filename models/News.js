const { Schema, model } = require('mongoose')


const schema = new Schema({
    title: String,
    text: String,
    image: String
}, { collection: 'news' })


module.exports = model('News', schema)
