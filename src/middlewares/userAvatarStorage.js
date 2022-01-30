const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/avatars')
  },
  filename: function (req, file, cb) {
    let fileName = `Avatar-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, fileName);
  }
})

var upload = multer({storage: storage}).single('avatar');

module.exports = upload