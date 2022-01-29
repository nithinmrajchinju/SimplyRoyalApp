const db = require('../model/model')
const hash = require('../middlewares/hashGenerator')

const authenticte = async (req, res, next) => {
    const session = await db.tokens.findOne({ $and: [{ token: req.headers.authentication }, {  }] });
    if (!session) {
        res.json({
            status: 'error',
            message: 'you are not authenticated'
        })
    }
    else {
        next()
    }
}

const tokenGen = async (req) => {
    const duplicate = await db.tokens.findOneAndUpdate({ user: req.body.email }, { token: hash.hashGenerate(10) })
    if (!duplicate) {
        await new db.tokens({ user: req.body.email, token: hash.hashGenerate(10) }).save()
    }
}

module.exports = {
    authenticte,
    tokenGen
}