require("dotenv").config()
const express = require("express")
const router = express.Router()
const apiController = require("../controllers/api/user.controller")
const authController = require("../controllers/api/auth.controller")
const authMiddleware = require("../middlewares/auth.middeware")
const jwt = require("jsonwebtoken")
const { Board, Column, Task } = require("../models/index")
const { Op } = require("sequelize")

// router.get("/users", apiController.index)
router.get("/api-key", authController.getApiKey)
router.get("/boards", authMiddleware, async (req, res) => {})
router.get("/boards/:id", authMiddleware, async (req, res) => {
    const { id } = req.params
    const response = {}
    try {
        const board = await Board.findOne({
            where: { id, user_id: req.user },
        })
        if (!board) {
            response.status = 404
            throw new Error("Not Found")
        }
        const columns = await board.getColumns()
        const tasks = []
        for (const column of columns) {
            const task = await column.getTasks()
            tasks.push(...task)
        }
        Object.assign(response, {
            status: 200,
            data: {
                id: board.id,
                name: board.name,
                columns: columns.map((c) => ({
                    _id: c.id,
                    column: c.id,
                    columnName: c.name,
                })),
                tasks: tasks.map((t) => ({
                    _id: t.id,
                    column: t.column_id,
                    content: t.content,
                    key: t.id,
                })),
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
})
router.post("/boards/:id", authMiddleware, async (req, res) => {
    const { id } = req.params
    const body = req.body
    const response = {}
    try {
        const board = await Board.findOne({
            where: { id, user_id: req.user },
        })
        if (!board) {
            response.status = 404
            throw new Error("Not Found")
        }
        for (const data of body) {
            if (!data.column) {
                response.status = 400
                throw new Error("Bad Request")
            }
        }
        const columns = await board.getColumns()
        for (const column of columns) {
            await Task.destroy({ where: { column_id: column.id } })
            await Column.destroy({ where: { id: column.id } })
        }

        for(const data of body) {
            await Column.create({
                id: data.column, // ??????
                    // -> Bỏ id tự tăng, sử dụng uuid
                name: data.columnName,
                board_id: id
            })
            if(data.content.trim() != "") {
                await Task.create({
                    column_id: data.column,
                    content: data.content
                })
            }
        }
        Object.assign(response, {
            status: 200,
            message: "Success",
        })
    } catch (e) {
        console.log(e)
        Object.assign(response, {
            status: response.status || 500,
            message: e.message || "Server Error",
        })
    }
    res.status(response.status).json(response)
})

module.exports = router
