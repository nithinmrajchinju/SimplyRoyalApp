const admin = require("../services/adminService");

const create = (req, res) => {
    admin.create(
        req.body.name,
        req.body.email,
        req.body.password,
        req.body.permission,
        req.body.date
    ).then((result) => {
        res.status(result.statusCode).json(result)
    })
}

const read = (req, res) => {
    admin.read(
        req.params.id
    ).then((result) => {
        res.status(result.statusCode).json(result)
    })
}

const update = (req, res) => {
    admin.update(
        req.params.id,
        req.body.name,
        req.body.email,
        req.body.password,
        req.body.permission,
        req.body.date
    ).then((result) => {
        res.status(result.statusCode).json(result)
    })
}

const deleteId = (req, res) => {
    admin.deleteId(
        req.params.id
    ).then((result) => {
        res.status(result.statusCode).json(result)
    })
}

const list = (req, res) => {
    admin.list(
        req.query
    ).then((result) => {
        res.status(result.statusCode).json(result)
    })
}

module.exports = {
    create,
    read,
    update,
    deleteId,
    list
}