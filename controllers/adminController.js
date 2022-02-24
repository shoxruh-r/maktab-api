const Admin = require('../models/Admin')
const jwt = require('jsonwebtoken')


exports.read = async (req, res) => {
    try {
        const { login, password } = req.body
        const data = await Admin.findOne({ login, password })

        if (data) {
            const token = jwt.sign({ _id: data._id }, process.env.SECRET_KEY)
            res.header('x-auth-token', token).json({ success: true })
        } else res.status(401).json({ success: false })
    } catch (e) {
        console.error(e)
        res.status(401).json({ success: false })
    }
}
