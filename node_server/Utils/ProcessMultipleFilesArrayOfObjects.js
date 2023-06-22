const fileSizeFormatter = require('./fileSizeFormatter');

module.exports = (req) => {
  // console.log('req.files In Process')
  // console.log(req.files)
  let filesArray = []
  console.log('PROCEss filesArray b4')
  console.log(filesArray)
  req.files.forEach(element => {
      const file = {
          fileName: element.originalname,
          filePath: `${req.protocol}://${req.get('host')}/${element.path}`,
          fileType: element.mimetype,
          fileSize: fileSizeFormatter(element.size, 2) //0.00
      }
      filesArray.push(file)
  })
  console.log('PROCESS filesArray afta')
  console.log(filesArray)
  return (filesArray)
}