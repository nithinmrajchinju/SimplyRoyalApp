const createHash = require('hash-generator')

const hashGenerate = (length) => {
    const hash = createHash(length);
    return hash;
}

module.exports = {
    hashGenerate
}