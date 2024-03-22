require("dotenv").config()
const { User } = require("../../models/index")
const jwt = require("jsonwebtoken")

module.exports = {
    getApiKey: async (req, res) => {
        const { email } = req.query
        const response = {}
        try {
            const user = await User.findOne({ where: { email } })
            if (!user) {
                response.status = 400
                throw new Error("Email không tồn tại!")
            }
            // const { JWT_SECRET } = process.env
            // const token = jwt.sign({ userId: user.id }, JWT_SECRET)
            // user.api_key = token
            // await user.save()
            Object.assign(response, {
                status: 200,
                message: "Success",
                data: {
                    apiKey: user.api_key,
                },
            })
        } catch (e) {
            console.log(e)
            Object.assign(response, {
                status: response.status || 500,
                message: e.message || "Server Error",
            })
        }
        res.status(response.status).json(response)
    },
}
