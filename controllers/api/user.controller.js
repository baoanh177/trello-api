const { User } = require("../../models/index")

module.exports = {
    index: async (req, res) => {
        const response = {}
        try {
            const users = await User.findAll({ attributes: { exclude: ["password"] } })
            Object.assign(response, {
                status: 200,
                message: "Success",
                data: users
            })
        }catch(e) {
            console.log(e)
            Object.assign(response, {
                status: 500,
                message: "Server Error"
            })
        }
        res.status(response.status).json(response)
    }
}