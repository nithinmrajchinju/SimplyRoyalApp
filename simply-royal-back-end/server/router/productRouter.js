const route = require('express').Router()

const file = require('../middlewares/multer');
const controller = require('../controller/productController')
const authentication = require('../middlewares/authentication')

route.post('/create', authentication.authenticte, file.upload.fields([{ name: 'image', maxCount: 1 }, { name: 'gallery', maxCount: 8 }]), controller.create)

route.get('/read/:id', authentication.authenticte, controller.read)

route.patch('/update/:id', authentication.authenticte, file.upload.fields([{ name: 'image', maxCount: 1 }, { name: 'gallery', maxCount: 8 }]), controller.update)

route.delete('/delete/:id', authentication.authenticte, controller.deleteId)

route.get('/list', authentication.authenticte, controller.list)

module.exports = route