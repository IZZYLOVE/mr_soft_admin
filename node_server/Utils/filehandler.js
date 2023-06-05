'use strict'
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    
    destination: (req, file, cb) => {
    console.log('filefilter cb 1')

        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
    console.log('filefilter cb2')

        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname)
        // cb(null, new Date().toISOString().replace(/:/g, '-') + path.extname(file.originalname))
    }
})

const filefilter = (req, file, cb) => {
    console.log('filefilter')
    if(file.mimetype === 'image/png' || 'image/png' || 'image/jpg' || 'image/jpeg'){
        cb(null, true)
    }else{
        cb(null, false)
    }
    console.log('filefilter x')

}

const upload = multer({storage: storage, fileFilter: filefilter})

// module.exports = {upload}
module.exports = upload