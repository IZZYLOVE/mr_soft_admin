const SingleFile = require('./../Models/singleFileModel')
const MultipleFiles = require('./../Models/multipleFilesModel')


exports.singleFileUpload = async(req, res, next) => {
    try{
        const file = new SingleFile({
            fileName: req.file.originalname,
            filePath: req.file.path,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2) //0.00
        })

        console.log(file)
        await file.save() // save the file in db
        res.status(201).send('File Uploaded successfully')
        
    }
    catch(error){
        res.status(400).send(error.message)
    }
}


exports.multipleFilesUpload = async(req, res, next) => {
    try{
        let filesArray = []
        req.files.forEach(element => {
            const file = {
                fileName: element.originalname,
                filePath: element.path,
                fileType: element.mimetype,
                fileSize: fileSizeFormatter(element.size, 2) //0.00
            }
            filesArray.push(file)
        })
        console.log(filesArray)
        const multipleFiles = new MultipleFiles({
            title: req.body.title,
            files: filesArray
        })
        await multipleFiles.save() // save the file in db
        res.status(201).send('File Uploaded successfully')

    }
    catch(error){
        res.status(400).send(error.message)
    }
}


exports.getallSingleFiles = async(req, res, next) => {
    try{
        const singlefiles = await SingleFile.find()
        res.status(201).send(singlefiles)
    }
    catch(error){
        res.status(400).send(error.message)
    }
}


exports.getallMultipleFiles = async(req, res, next) => {
    try{
        const multilefiles = await MultipleFiles.find()
        res.status(201).send(multilefiles)
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
