const Info = require('../models/Info')


exports.read = async (req, res) => {
    try {
        const data = Info.findOne()
        res.json({ success: true, data })
    } catch (e) {
        res.status(400).json({ success: false })
    }
}


exports.update = async (req, res) => {
    try {
        const success = Info.updateOne(req.body.text)
        res.json({ success })
    } catch (e) {
        console.log(e)
        res.status(400).json({ success: false })
    }
}
