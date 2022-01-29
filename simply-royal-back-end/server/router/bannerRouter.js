const route = require('express').Router()

const file = require('../middlewares/multer');
const authentication = require('../middlewares/authentication')
const controller = require('../controller/bannerController')

route.post('/add', authentication.authenticte, file.upload.single('image'), controller.add)

route.get('/read/:id', authentication.authenticte, controller.read)

route.patch('/update/:id', authentication.authenticte, file.upload.single('image'), controller.update)

route.delete('/delete/:id', authentication.authenticte, controller.deleteId)

route.get('/list', authentication.authenticte, controller.list)

module.exports = route