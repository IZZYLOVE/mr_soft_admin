const fileSizeFormatter = require('../Utils/fileSizeFormatter');

module.exports = (req) => {
  const fileObj = {
    fileName: req.file.originalname,
    filePath: `${req.protocol}://${req.get('host')}/${req.file.path}`,
    fileType: req.file.mimetype,
    fileSize: fileSizeFormatter(req.file.size, 2) //0.00
  }
  return (fileObj)
}