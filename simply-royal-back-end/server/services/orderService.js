const db = require('../model/model')
const hash = require('../middlewares/hashGenerator')

const create = (req) => {
    return new Promise(async (resolve, reject) => {
        const user = await db.customer.findById(req.body.user)
        if (!user) {
            reject({ message: 'user not found' })
            return
        }
        let order = await new db.orders(Object.assign(req.body, { date: Date.now(), orderId: await hash.hashGenerate(10) })).save()
        let amount = 0, time = 0
        var product
        req.body.productList.forEach(async (item) => {
            product = await db.products.findByIdAndUpdate(item.productid, { $inc: { productStock: -item.qty } }, { new: true })
            amount = amount + (product.productPrice - ((product.productDiscount / product.productPrice) * 100)) * item.qty;
            time = time + product.preparationTime + order.schedule.scheduled_at;
        })
        await db.orders.findByIdAndUpdate(
            order._id,
            { $set: { totalAmount: amount } },
            { new: true }
        )
        resolve(order)
        if ((product.preparationTime < time) && (time < 90)) {
            console.log("delivery possible");
        } else {
            console.log("delivery not possible");
        }
        console.log("totalAmount :" + amount);
    })
}

const read = (req) => {
    return new Promise(async (resolve, reject) => {
        const model = await db.orders.findById(req.params.id)
        if (!model) {
            reject({ message: 'order not found' })
            return
        }
        resolve(model)
    })
}

const update = (req) => {
    return new Promise(async (resolve, reject) => {
        const model = await db.orders.findByIdAndUpdate(req.params.id, req.body)
        resolve(model)
    })
}

const deleteId = (req) => {
    return new Promise(async (resolve, reject) => {
        const model = await db.orders.findByIdAndDelete(req.params.id)
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
        resolve(db.orders.find(filter).skip(xpage).limit(xlimit).sort(sort).populate('user productList.productid').exec())
    })
}



module.exports = {
    create,
    read,
    update,
    deleteId,
    list
}