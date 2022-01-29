const db = require('../model/model');

const add = async (req) => {
    return new Promise(async (resolve, reject) => {
        resolve(await new db.address(Object.assign(req.body)).save())
    })
}

const read = async (req) => {
    return new Promise(async (resolve, reject) => {
        let address = await db.address.findById(req.params.id)
        if (address) resolve(address)
        reject({message: 'not found'})
    })
}

const update = async (req) => {
    return new Promise(async (resolve, reject) => {
        let address = await db.address.findById(req.params.id)
        if (!address) reject({ message: 'not found' })
        newAddress = await db.address.findByIdAndUpdate(req.params.id, req.body, { new: true })
        resolve(newAddress)
    })
}

const deleteId = (req) => {
    return new Promise(async (resolve, reject) => {
        resolve(db.address.findByIdAndDelete(req.params.id))
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
        resolve(db.address.find(filter).skip(xpage).limit(xlimit).sort(sort).populate('user').exec())
    }) 
}

module.exports = {
    add,
    read,
    update,
    deleteId,
    list
}