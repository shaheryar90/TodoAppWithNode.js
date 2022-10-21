const express = require("express");
const router = express.Router();
const productController = require("../../controllers/product");
const auth = require("../../middlewares/auth")
const isAdmin = require("../../middlewares/isAdmin")
const UploadFile = require("../../services/UploadFiles");
const UploadFile1 = require("../../services/UploadFiles1");
const uploads = UploadFile.uploadImage()
const uploads1 = UploadFile1.uploadImage()

router.post("/addProduct", productController.addProduct);
router.post("/addImage",uploads1.single("image"), productController.addImage);
router.post("/skinImage",uploads1.single("image"), productController.skinImage);

// router.get("/:id?", auth, isAdmin, productController.getProduct);
router.get("/getProduct", productController.getProduct);
router.delete("/deleteProduct/:id", productController.deleteProduct);
router.put("/updateProduct/:id", productController.updateProduct);



// router.get("/getProduct" ,productController.getProduct);
// router.post("/addProduct" ,productController.addProduct);

module.exports = router;