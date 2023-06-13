// const CustomError = require('../Utils/CustomError');
const asyncErrorHandler = require('../Utils/asyncErrorHandler');
const GetUserDetailsFromHeader = require('../Utils/GetUserDetailsFromHeader')

const User = require('./../Models/userModel')





exports.linkProfileImage = asyncErrorHandler(async(req, res, next) => {
    const testToken = req.headers.authorization
    const decodedToken =  await GetUserDetailsFromHeader(testToken)
    
    const user = await User.findById(decodedToken._id)
        const file = {
            fileName: req.file.originalname,
            filePath: `${req.protocol}://${req.get('host')}/${req.file.path}`,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2) //0.00
        }

        user.profileImg = file

        await user.save({validateBeforeSave: false})

        res.status(201).send('File Uploaded successfully')
})


exports.unlinkProfileImage = asyncErrorHandler(async(req, res, next) => {
    const decodedToken =  await GetUserDetailsFromHeader(testToken)


    const user = await User.findById(decodedToken._id)

        const file = undefined

        user.profileImg = file

        await user.save({validateBeforeSave: false})

        res.status(201).send('File unlinked successfully')

})




const fileSizeFormatter = (bytes, decimal) => {
    if(bytes === 0){
        return "0 Bytes"
    }
    const dm = decimal || 2
    const sizes = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB']
    const index = Math.floor(Math.log(bytes)/Math.log(1000))
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + '-' + sizes[index]

}