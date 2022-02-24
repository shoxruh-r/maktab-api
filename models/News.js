const fs = require('fs')
const path = require('path')


module.exports = {
    save(object) {
        let document = fs.readFileSync(path.join(__dirname, './databases/news.json'), { encoding: 'utf8' })
        document = JSON.parse(document)
        document.push(object)
        fs.writeFileSync(path.join(__dirname, './databases/news.json'), JSON.stringify(document))
        return true
    },

    find() {
        const document = fs.readFileSync(path.join(__dirname, './databases/news.json'), { encoding: 'utf8' })
        return JSON.parse(document)
    },

    findById(id) {
        const document = fs.readFileSync(path.join(__dirname, './databases/news.json'), { encoding: 'utf8' })
        return JSON.parse(document)[id]
    },

    findByIdAndUpdate(id, object) {
        let document = fs.readFileSync(path.join(__dirname, './databases/news.json'), { encoding: 'utf8' })
        document = JSON.parse(document)
        document[id] = object
        fs.writeFileSync(path.join(__dirname, './databases/news.json'), JSON.stringify(document))
        return true
    },

    findByIdAndDelete(id) {
        let document = fs.readFileSync(path.join(__dirname, './databases/news.json'), { encoding: 'utf8' })
        document = JSON.parse(document)
        document.splice(id, 1)
        fs.writeFileSync(path.join(__dirname, './databases/news.json'), JSON.stringify(document))
        return true
    }
}