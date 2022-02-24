const jwt = require('jsonwebtoken')


module.exports = (req, res, next) => {
    const token = req.headers.authorization

    if (!token) return res.status(401).json({ success: false })

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        console.log(decoded)
        
        if (decoded.login && decoded.password) next()
        else res.status(401).json({ success: false })
    } catch (e) {
        return res.status(401).json({ success: false })
    }
}
