const db = require('../model/model');

const lowStock = () => {
    return new Promise(async (resolve, reject) => {
        let list = await db.products.find({ "productStock": { $lte: 5 } })
        if (list) resolve(list)
        reject({ message: 'not found' })
    })
}

const outOfStock = async () => {
    return new Promise(async (resolve, reject) => {
        let list = await db.products.find({ "productStock": { $lte: 0 } })
        if (list) resolve(list)
        reject({ message: 'not found' })
    })
}

module.exports = {
    lowStock,
    outOfStock
}