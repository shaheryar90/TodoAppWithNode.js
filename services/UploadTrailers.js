const fs = require("fs")
const path = require("path")
const multer = require('multer');
class UploadFile {
  uploadVideo() {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        const userName = req.user.data.userName;
        const dir = `./public/uploads/${userName}/`
        fs.stat(dir, exist => {
          if (exist) {
            var mkdir = fs.mkdir(dir, () => { })
          }
          cb(null, dir)
        })
      },
      filename: function (req, file, cb) {
        const {
          userName,
        } = req.user.data
        cb(
          null,
          file.fieldname + "_" + Date.now() + "_" + userName + "_" + file.originalname
        );
      }
    })

    return multer({
      storage,
      limits: 1024 * 1024 * 250, // 250 MB
      fileFilter: (req, file, cb) => {
        const fileTypes = /mp4|mov|avi|wmv|x-flv|webm|mkv|ogg/;
        const extname = fileTypes.test(
          path.extname(file.originalname).toLowerCase()
        );
        const mimeType = fileTypes.test(file.mimetype);
        if (mimeType && extname) {
          return cb(null, true);
        } else {
          cb("Error: invalid file type");
        }
      }
    })
  }
}
module.exports = new UploadFile()