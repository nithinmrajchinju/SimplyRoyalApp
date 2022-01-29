const
    aws = require('aws-sdk'),
    multer = require('multer'),
    multerS3 = require('multer-s3'),
    s3 = new aws.S3();

require('dotenv').config()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});

// const storage = s3({
//     dirname: '/',
//     bucket: 'bucket',
//     secretAccessKey: 'key',
//     accessKeyId: 'key',
//     region: 'us-west-2',
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     }
// })

const upload = multer({ storage: storage });

module.exports = {
    upload
}