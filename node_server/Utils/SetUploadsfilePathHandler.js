const fs = require('fs')

const SetuploadfilePathhandler = (req, dir) => {
  console.log('req.files In SetuploadfilePathhandler')
  console.log(req.files)
  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir, { recursive: true });
  }
    req.headers.targetFilepath = dir
    return (dir)
}

module.exports = SetuploadfilePathhandler