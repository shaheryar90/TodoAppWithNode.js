const fs = require("fs")
const path = require("path")
const multer = require('multer');
class UploadFile {
    uploadImage() {
        console.log("upload image")
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                // const userName = req?.body?.email?.split("@")[0] || "products";
                // const dir = `./public/uploads/img${Math.random() * 100}/`
                const dir = `./public/uploads/diseaseImage/`
                fs.stat(dir, exist => {
                    if (exist) {
                        var mkdir = fs.mkdir(dir, () => { })
                    }
                    cb(null, dir)
                })
            },
            filename: function (req, file, cb) {
                // const userName = req?.body?.email?.split("@")[0] || "products";
                cb(
                    null,
                    file.fieldname + "_" + Date.now() + "_" + file.originalname
                );
            }
        })

        return multer({
            storage,
            limits: 1024 * 1024 * 5,
            fileFilter: (req, file, cb) => {
                const fileTypes = /jpeg|png|jpg|svg/;
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