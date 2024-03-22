require("dotenv").config()
const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    const apiKey = req.get("X-Api-Key")
    try {
        const { JWT_SECRET } = process.env
        const token = jwt.verify(apiKey, JWT_SECRET)
        req.user = token.userId
        next()
    }catch(e) {
        res.status(401).json({
            status: 401,
            message: "Unauthorize"
        })
    }
}