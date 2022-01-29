const db = require('../model/model');

const create = async (req) => {
    return new Promise(async (resolve, reject) => {
        resolve(await new db.promotions(Object.assign(req.body)).save())
    })
}

const read = async (req) => {
    return new Promise(async (resolve, reject) => {
        let promotion = await db.promotions.findById(req.params.id)
        if (promotion) resolve(promotion)
        reject({message: 'not found'})
    })
}

const update = async (req) => {
    return new Promise(async (resolve, reject) => {
        let promotion = await db.promotions.findById(req.params.id)
        if (!promotion) reject({ message: 'not found' })
        newPromotion = await db.promotions.findByIdAndUpdate(req.params.id, req.body, { new: true })
        resolve(newPromotion)
    })
}

const deleteId = (req) => {
    return new Promise(async (resolve, reject) => {
        resolve(db.promotions.findByIdAndDelete(req.params.id))
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
        resolve(db.promotions.find(filter).skip(xpage).limit(xlimit).sort(sort))
    })
}

module.exports = {
    create,
    read,
    update,
    deleteId,
    list
}