const fileSizeFormatter = require('../Utils/fileSizeFormatter');
const CustomError = require('./CustomError')

       

module.exports = (req) => {
  console.log('linkProfileImage here')
  console.log(req.file.originalname)

  console.log('file found')

  const fileObj = {
    fileName: req.file.originalname,
    filePath: `${req.protocol}://${req.get('host')}/${req.file.path}`,
    fileType: req.file.mimetype,
    fileSize: fileSizeFormatter(req.file.size, 2) //0.00
  }
  return (fileObj)
}