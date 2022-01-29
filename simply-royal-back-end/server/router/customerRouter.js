const route = require('express').Router()

const controller = require('../controller/customerController')
const file = require('../middlewares/multer');
const authentication = require('../middlewares/authentication')

route.post('/validation', controller.validation)
route.post('/verifyotp', controller.verifyOTP)

route.post('/register', file.upload.single('image'),  controller.register)
route.post('/login', controller.login)

route.get('/read/:id', authentication.authenticte, controller.read)
route.patch('/update/:id', authentication.authenticte,  controller.update)
route.delete('/delete/:id', authentication.authenticte, controller.deleteId)

route.post('/profileimage/:id', authentication.authenticte, file.upload.single('image'), controller.updatePhoto)
route.get('/list', authentication.authenticte, controller.list)

module.exports = route;