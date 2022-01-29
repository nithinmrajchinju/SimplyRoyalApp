const mongoose = require('mongoose');

const admins = mongoose.model('admins', {
    name: String,
    email: String,
    password: String,
    permission: Array,
    date: Date
})

const customer = mongoose.model('customers', {
    name: String,
    phone: String,
    email: String,
    photo: String,
    status: { type: Boolean, default: true },
    date: { type: Date, default: Date.now() }
})

const categorys = mongoose.model('categorys', {
    categoryName: String,
    categoryImage: String,
    categoryRecommented: { type: Boolean, default: true },
    date: { type: Date, default: Date.now() }
})

const products = mongoose.model('products', {
    productName: String,
    productCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'categorys' },
    productStock: Number,
    productPrice: Number,
    productDiscount: Number,
    productSKU: String,
    minimumPurchase: String,
    productDescription: String,
    productImage: String,
    variations: String,
    productTax: Number,
    status: { type: Boolean, default: true },
    date: { type: Date, default: Date.now() },
    productGallery: Array,
    preparationTime :Number
})

const carts = mongoose.model('carts', {
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'customers' },
    productid: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
    qty: Number,
    variation: Object,
    isAdded: { type: Boolean, default: true },
    date: { type: Date, default: Date.now() }
})

const promotions = mongoose.model('promotions', {
    name: String,
    discount: Number,
    code: String,
    expiryStart: { type: Date, default: Date.now() },
    expiryEnd: { type: Date, default: Date.now() },
    hasExpiry: { type: Boolean, default: true }
})

const orders = mongoose.model('orders', {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'customers' },
    orderId: String,
    productList: [{ productid: { type: mongoose.Schema.Types.ObjectId, ref: 'products' }, qty: Number, variation: Object }],
    totalAmount: { type: Number, default: 0 },
    discount: Number,
    haveCoupon: Boolean,
    couponCode: String,
    orderStatus: { type: String, default: 'pending', enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'] },
    deliveryAddress: { type: mongoose.Schema.Types.ObjectId, ref: 'address' },
    estimateDelivery: Date,
    invoiceFile: String,
    date: { type: Date, default: Date.now() },
    schedule: {
        schedule_type: String,
        schedule_on: Date,
        scheduled_at: Number,
        is_tavelling: Boolean,
        tarvelling_mode: String,
        vehicle_model: String,
        vehicle_color: String,
        vehicle_number: String
    },
})

const banners = mongoose.model('banners', {
    name: String,
    image: String,
    category: String
})

const reviews = mongoose.model('reviews', {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'customers' },
    productid: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
    title: String,
    description: String,
    rating: Number,
    date: Date
})

const address = mongoose.model('address', {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'customers' },
    location: String,
    address: String,
    latitude: Number,
    longitude: Number,
    landmark: String,
    default: { type: Boolean, default: true }
})

const tokens = mongoose.model('tokens', {
    user: String,
    token: String,
    createdAt: { type: Date, default: Date.now }
})

module.exports = {
    products,
    categorys,
    carts,
    tokens,
    promotions,
    orders,
    admins,
    banners,
    customer,
    reviews,
    address,
}