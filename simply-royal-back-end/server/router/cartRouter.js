const route = require('express').Router()

const controller = require('../controller/cartController')
const authentication = require('../middlewares/authentication')

route.post('/add', authentication.authenticte, controller.add)

route.get('/read/:id', authentication.authenticte, controller.read)

route.patch('/update/:id', authentication.authenticte, controller.update)

route.delete('/delete/:id', authentication.authenticte, controller.deleteId)

route.get('/list', authentication.authenticte, controller.list)


module.exports = route