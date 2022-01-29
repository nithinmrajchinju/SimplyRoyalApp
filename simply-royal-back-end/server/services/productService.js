const db = require('../model/model');
require('dotenv').config()

const create = async (req) => {
    return new Promise(async (resolve, reject) => {
        let newProduct = await new db.products(req.body)
        if (req.files) {
            newProduct = await new db.products(Object.assign(req.body,
                {
                    productImage: process.env.HOST + req.files['image'][0].filename
                }
            )).save()
            for (let i = 0; i < req.files['gallery'].length; i++) {
                await db.products.findByIdAndUpdate(
                    newProduct._id,
                    { $push: { productGallery: process.env.HOST + req.files['gallery'][i].filename } },
                    { new: true }
                )
            }
        }
        resolve(newProduct)
    })
}

const read = (req) => {
    return new Promise(async (resolve, reject) => {
        let product = await db.products.findById(req.params.id).populate('productCategory')
        if (product) resolve(product)
        reject({ message: 'not found' })
    })
}

const update = (req) => {
    return new Promise(async (resolve, reject) => {
        let product = await db.products.findById(req.params.id)
        if (!product) {
            reject({ message: 'not found' })
            // return
        }
        let newproduct = await db.products.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (req.files) {
            await db.products.findByIdAndUpdate(req.params.id, {$set:{productGallery:[]}})
            for (let i = 0; i < req.files['gallery'].length; i++) {
                newproduct = await db.products.findByIdAndUpdate(req.params.id, Object.assign(req.body,
                    {
                        productImage: process.env.HOST + req.files['image'][0].filename,
                        $push: { productGallery: process.env.HOST + req.files['gallery'][i].filename }
                    }
                ), { new: true })
            }
        }
        resolve(newproduct)
    })
}

const deleteId = (req) => {
    return new Promise(async (resolve, reject) => {
        resolve(db.products.findByIdAndDelete(req.params.id))
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
        resolve(db.products.find(filter).skip(xpage).limit(xlimit).sort(sort).populate('productCategory').exec())
    })
}

const imageUpload = (req) => {
    return new Promise(async (resolve, reject) => {
        if (req.file) {
            resolve(await db.products.findByIdAndUpdate(req.params.id, Object.assign({
                productGallery: process.env.HOST + req.file.filename
            }), { new: true }))
        }
        reject({ message: 'files not found' })
    })
}

module.exports = {
    create,
    read,
    update,
    deleteId,
    list,
    imageUpload
}