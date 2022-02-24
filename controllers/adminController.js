const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')


exports.read = async (req, res) => {
    try {
        const { login, password } = req.body

        const isCompared = Admin.compare({ login, password })
        
        if (!isCompared) res.status(401).json({ success: false })

        const token = jwt.sign({ login, password }, process.env.SECRET_KEY)
        res.header('x-auth-token', token).json({ success: true })
    } catch (e) {
        res.status(401).json({ success: false })
    }
}
