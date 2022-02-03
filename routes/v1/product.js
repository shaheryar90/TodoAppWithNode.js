const express = require("express");
const router = express.Router();
const productController = require("../../controllers/product");
const auth = require("../../middlewares/auth")
const isAdmin = require("../../middlewares/isAdmin")
const UploadFile = require("../../services/UploadFiles");
const uploads = UploadFile.uploadImage()

router.post("/", auth, isAdmin, uploads.single("image"), productController.addProduct);

router.get("/:id?", auth, isAdmin, productController.getProduct);

module.exports = router;