const db = require('../model/model');
const hash = require('../middlewares/hashGenerator');
const bcrypt = require("bcrypt");

const create = async (name, email, password, permission, date) => {
    const admin = await db.admins.findOne({ email })
    if (!admin) {
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        const newAdmin = new db.admins({
            name,
            email,
            password,
            permission,
            date
        })
        newAdmin.save()
        return {
            statusCode: 200,
            status: true,
            message: "successfully created"
        }
    }
    return {
        statusCode: 422,
        status: false,
        message: "exist..!"
    }
}

const read = (email) => {
    return db.admins.findOne({ email }).then((admin) => {
        if (!admin) {
            return {
                statusCode: 422,
                status: false,
                message: "invalid id"
            }
        }
        return {
            statusCode: 200,
            status: true,
            message: "readed successfully",
            admin
        }
    })
}

const update = async (id, name, email, password, permission, date) => {
    const admin = await db.admins.findOne({ email: id })
        if (!admin) {
            return {
                statusCode: 422,
                status: false,
                message: "invalid"
            }
        }
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        return db.admins.updateOne(
            { email: id },
            {
                $set: {
                    name: name,
                    email: email,
                    password: password,
                    permission: permission,
                    date: date
                }
            }
        ).then(() => {
            return {
                statusCode: 200,
                status: true,
                message: "updated successfully"
            }
        })
}

const deleteId = (email) => {
    return db.admins.findOne({ email }).then((admin) => {
        if (!admin) {
            return {
                statusCode: 422,
                status: false,
                message: "invalid"
            }
        }
        return db.admins.deleteOne({ email }).then(() => {
            return {
                statusCode: 200,
                status: true,
                message: "deleted successfully"
            }
        })
    })
}

const list = (query) => {
    var search, sort, skip, limit;
    console.log(query);
    if (query.search) {
        search = { name: query.search };
        sort = query.sort;
        skip = parseInt(query.page)
        limit = parseInt(query.limit);
        return db.admins.find(search).sort(sort).limit(limit).skip(skip).then((admin) => {
            if (admin) {
                return {
                    statusCode: 200,
                    status: true,
                    message: "found successfully",
                    admin
                }
            }
        })
    }
    if (query) {
        sort = query.sort;
        skip = parseInt(query.page)
        limit = parseInt(query.limit);
    }
    return db.admins.find().sort(sort).skip(skip).limit(limit).then((admin) => {
        if (!admin) {
            return {
                statusCode: 422,
                status: false,
                message: "invalid"
            }
        }
        return {
            statusCode: 200,
            status: true,
            message: "successfully listed",
            admin
        }
    })
}

module.exports = {
    create,
    read,
    update,
    deleteId,
    list,
}