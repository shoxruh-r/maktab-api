const fs = require('fs')
const path = require('path')


module.exports = {
    findOne() {
        return fs.readFileSync(path.join(__dirname, './databases/info.txt'), { encoding: 'utf8' })
    },

    updateOne(text) {
        fs.writeFileSync(path.join(__dirname, './databases/info.txt'), text)
        return true
    }
}