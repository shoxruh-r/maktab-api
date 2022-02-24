const jwt = require('jsonwebtoken')
const { ObjectId } = require('mongoose').Types


module.exports = (req, res, next) => {
    const token = req.headers.authorization

    if (!token) return res.status(401).json({ success: false })

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        
        if (ObjectId.isValid(decoded._id)) next()
        else res.status(401).json({ success: false })
    } catch (e) {
        return res.status(401).json({
            success: false
        })
    }
}
