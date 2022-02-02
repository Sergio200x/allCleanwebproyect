const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/products')
  },
  filename: function (req, file, cb) {
    let fileName = `product-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, fileName);
  }
})

var upload = multer({storage: storage}).single('photo');

module.exports = upload