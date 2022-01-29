const route = require('express').Router()

const controller = require('../controller/reportController');
const authentication = require('../middlewares/authentication')

route.get('/product/lowstock', authentication.authenticte, controller.lowStock)

route.get('/product/outofstock', authentication.authenticte, controller.outOfStock)

module.exports = route