const multer = require('multer');
const path = require('path');
const getRandomId = require('../utils/file_id');

const storage = multer.diskStorage({
    destination: process.env.Upload_Directory_path,
    filename: (req, file, callback) => {
        callback(null,
            file.originalname.split('.')[0] + '_' + getRandomId() + '.' + file.originalname.split('.')[1]
        );
    }
})

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /mp4|mov|mkv|wmv|avi|flv|wbem/
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = fileTypes.test(file.mimetype);
        if (extname && mimeType) {
            return cb(null, true);
        } else {
            cb('Error: Invalid file format');
        }
    }
}).single('video');

module.exports = upload;