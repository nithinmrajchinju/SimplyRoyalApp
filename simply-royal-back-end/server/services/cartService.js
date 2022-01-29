const db = require('../model/model');

const add = (req) => {
    return new Promise(async(resolve, reject) => {
        const newCart = await new db.carts(Object.assign(req.body,{date: Date.now()})).save()
        resolve(newCart)
    })
}

const read = (req) => {
    return new Promise(async(resolve, reject) => {
        const cart = await db.carts.findById(req.params.id)
        if (!cart) {
            reject({ message: 'cart not found' })
            return
        }
        resolve(cart)
    })
}

const update = (req) => {
    return new Promise(async(resolve, reject) => {
        const cart = await db.carts.findByIdAndUpdate(req.params.id, req.body)
        resolve(cart)
    })
}

const deleteId = (req) => {
    return new Promise(async(resolve, reject) => {
        const cart = await db.carts.findByIdAndDelete(req.params.id)
        resolve(cart)
    })
}

const list = (req) => {
    return new Promise(async (resolve, reject) => {
        let filter = req.query.filter
        let page = parseInt(req.query.page)
        let limit = parseInt(req.query.limit)
        let xpage = page && limit ? (parseInt(req.query.page) - 1) * parseInt(req.query.limit) : parseInt(req.query.page)
        let xlimit = page && limit ? parseInt(req.query.limit) : parseInt(req.query.limit)
        let sort = req.query.sort
        resolve(db.carts.find(filter).skip(xpage).limit(xlimit).sort(sort).populate('userid productid').exec())
    }) 
}

module.exports = {
    add,
    read,
    update,
    deleteId,
    list
}