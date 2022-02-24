const fs = require('fs')
const path = require('path')


module.exports = {
    compare(object) {
        let document = fs.readFileSync(path.join(__dirname, './databases/admin.json'), {encoding:'utf8'})
        document = JSON.parse(document)
        return document.login === object.login && document.password === object.password
    }
}