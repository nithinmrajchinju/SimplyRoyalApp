const service = require('../services/reportService');

const lowStock = (req, res) => {
    service.lowStock(req)
        .then((result) => {
            res.json({ status: 'success', data: result })
        })
        .catch(err => {
            res.json({ status: 'error', data: err.message })
        })
}

const outOfStock = (req, res) => {
    service.outOfStock(req)
        .then((result) => {
            res.json({ status: 'success', data: result })
        })
        .catch(err => {
            res.json({ status: 'error', data: err.message })
        })
}

module.exports = {
    lowStock,
    outOfStock
}