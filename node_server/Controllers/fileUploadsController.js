// const SingleFile = require('./../Models/singleFileModel')
// const MultipleFiles = require('./../Models/multipleFilesModel')
const User = require('./../Models/userModel')




exports.linkProfileImage = async(req, res, next) => {
    const user = await User.findById(req.body.userId)
    try{
        const file = {
            fileName: req.file.originalname,
            filePath: `${req.protocol}://${req.get('host')}/${req.file.path}`,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2) //0.00
        }

        user.profileImg = file

        await user.save({validateBeforeSave: false})

        res.status(201).send('File Uploaded successfully')
        
    }
    catch(error){
        res.status(400).send(error.message) 
    }
}


exports.unlinkProfileImage = async(req, res, next) => {
    const user = await User.findById(req.params._id)
    try{
        const file = undefined

        user.profileImg = file

        await user.save({validateBeforeSave: false})

        res.status(201).send('File unlinked successfully')
        
    }
    catch(error){
        res.status(400).send(error.message) 
    }
}




const fileSizeFormatter = (bytes, decimal) => {
    if(bytes === 0){
        return "0 Bytes"
    }
    const dm = decimal || 2
    const sizes = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB']
    const index = Math.floor(Math.log(bytes)/Math.log(1000))
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + '-' + sizes[index]

}
