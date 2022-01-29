const db = require('../model/model');

const add = (req) => {
    return new Promise(async (resolve, reject) => {
        const review = await db.reviews.findOne({ user: req.body.userid, productid: req.body.productid })
        if (review) {
            reject({ message: 'You are already added a review for this product' })
            return
        }
        const model = await new db.reviews(Object.assign(req.body,{date: Date.now()})).save()
        resolve(model)
    })
}

const read = (req) => {
    return new Promise(async(resolve, reject) => {
        const model = await db.reviews.findById(req.params.id)
        if (!model) {
            reject({ message: 'review not found' })
            return
        }
        resolve(model)
    })
}

const update = (req) => {
    return new Promise(async(resolve, reject) => {
        const model = await db.reviews.findByIdAndUpdate(req.params.id, req.body)
        resolve(model)
    })
}

const deleteId = (req) => {
    return new Promise(async(resolve, reject) => {
        const model = await new db.reviews.findByIdAndDelete(req.params.id)
        resolve(model)
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
        resolve(db.reviews.find(filter).skip(xpage).limit(xlimit).sort(sort).populate('user productid').exec())
    }) 
}

module.exports = {
    add,
    read,
    update,
    deleteId,
    list
}