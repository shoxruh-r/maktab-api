const Info = require('../models/Info')


exports.read = async (req, res) => {
    try {
        const data = await Info.findOne()
        res.json({ success: true, data })
    } catch (e) {
        console.error(e)
        res.status(400).json({ success: false })
    }
}


exports.update = async (req, res) => {
    try {
        await Info.updateOne({}, req.body)
        res.json({ success: true })
    } catch (e) {
        console.error(e)
        res.status(400).json({ success: false })
    }
}
