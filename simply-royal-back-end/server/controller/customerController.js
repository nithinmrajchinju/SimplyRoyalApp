const service = require("../services/customerService");

const validation = (req, res) => {
    service.validation(req)
    .then((result) => {
        res.json({status: 'success', data: result})
    })
    .catch(err => res.json({status: 'error', data: err.message}))
}

const verifyOTP = (req, res) => {
    service.verifyOTP(req)
    .then((result) => {
        res.json({status: 'success', data: result})
    })
    .catch(err => res.json({status: 'error', data: err.message}))
}

const register = async (req, res) => {
    service.register(req)
    .then((result) => {
        res.json({status: 'success', data: result})
    })
    .catch(err => res.json({status: 'error', data: err.message}))
}

const login = async (req, res) => {
    service.login(req)
    .then((result) => {
        res.json({status: 'success', data: result})
    })
    .catch(err => res.json({status: 'error', data: err.message}))
}

const read = (req, res) => {
    service.read(
        req
    ).then((result) => {
        res.json({status: 'success', data: result})
    })
    .catch(err => res.json({status: 'error', data: err.message}))
}

const update = (req, res) => {
    service.update(
        req
    ).then((result) => {
        res.json({status: 'success', data: result})
    })
    .catch(err => res.json({status: 'error', data: err.message}))
}

const deleteId = (req, res) => {
    service.deleteId(
        req
    ).then((result) => {
        res.json({status: 'success', data: result})
    })
    .catch(err => res.json({status: 'error', data: err.message}))
}

const list = (req, res) => {
    service.list(
        req
    ).then((result) => {
        res.json({status: 'success', data: result})
    })
    .catch(err => res.json({status: 'error', data: err.message}))
}

const updatePhoto = (req, res) => {
    service.updatePhoto(req)
    .then((result) => {
        res.json({status: 'success', data: result})
    })
    .catch(err => res.json({status: 'error', data: err.message}))
}

module.exports = {
    validation,
    verifyOTP,
    register,
    login,
    read,
    update,
    deleteId,
    list,
    updatePhoto
}