const db = require('../model/model');
const auth = require('../middlewares/authentication')
const bcrypt = require('bcrypt');
const axios = require('axios')
require('dotenv').config()

const validation = (req) => {
    return new Promise(async (resolve, reject) => {
        axios.get(`https://2factor.in/API/V1/${process.env.SMS_KEY}/SMS/+91${req.body.phone}/AUTOGEN`).then(data => {
            if (data.data.Status !== 'Success') {
                reject({ message: 'invalid number (enter valide number)' })
            }
            resolve(data.data)
        })
    })
}

const verifyOTP = (req) => {
    return new Promise(async (resolve, reject) => {
        await db.customer.findOne({ phone: req.body.phone }).then((customer) => {
            if (!customer) {
                console.log('new user');
            }
            else {
                console.log('existing user');
            }
        })
        axios.get(`https://2factor.in/API/V1/${process.env.SMS_KEY}/SMS/VERIFY/${req.body.session}/${req.body.otp}`).then(data => {
            if (data.data.Status === 'Success') {
                resolve(data.data)
            }
            reject({ message: 'invalid OTP' })
        })
    })
}

const register = async (req) => {
    return new Promise(async (resolve, reject) => {
        const duplicate = await db.customer.findOne({ phone: req.body.phone })
        if (!duplicate) {
            const newUser = await new db.customer(Object.assign(req.body)).save()
            resolve(newUser)
            auth.tokenGen(req);
        }
        reject({ message: 'User Already Exist' })
        // return ({ message: 'User Already Exist' })
    })
}

const login = async (req) => {
    return new Promise(async (resolve, reject) => {
        const duplicate = await db.customer.findOne({ email: req.body.email })
        if (!duplicate) {
            reject({ message: 'Invalid Email' })
            // return ({ message: 'Invalid Email' })
        }
        resolve(duplicate)
        auth.tokenGen(req);
    })
}

const read = async (req) => {
    return new Promise(async (resolve, reject) => {
        resolve(db.customer.findById(req.params.id))
    })
}

const update = async (req) => {
    return new Promise(async (resolve, reject) => {
        resolve(db.customer.findByIdAndUpdate(req.params.id, req.body, { new: true }))
    })
}

const deleteId = (req) => {
    return new Promise(async (resolve, reject) => {
        resolve(db.customer.findByIdAndDelete(req.params.id))
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

        resolve(db.customer.find(filter).skip(xpage).limit(xlimit).sort(sort).populate().exec())
    })
}

const updatePhoto = async (req) => {
    return new Promise(async (resolve, reject) => {
        if (req.file) {
            let data = await db.customer.findByIdAndUpdate(
                req.params.id,
                { image: process.env.HOST + req.file.filename },
                { new: true }
            )
            resolve(data)
        }
        reject({ message: 'File not found' })
    })
}

module.exports = {
    validation,
    verifyOTP,
    register,
    login,
    read,
    update,
    deleteId,
    list,
    updatePhoto
}