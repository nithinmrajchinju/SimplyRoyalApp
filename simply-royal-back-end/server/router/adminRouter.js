const route = require('express').Router()

const admin = require('../controller/adminController');
const authentication = require('../middlewares/authentication')

route.post('/add', authentication.authenticte, admin.create)

route.get('/read/:id', authentication.authenticte, admin.read)

route.patch('/update/:id', authentication.authenticte, admin.update)

route.delete('/delete/:id', authentication.authenticte, admin.deleteId)

route.get('/list', authentication.authenticte, admin.list)

module.exports = route