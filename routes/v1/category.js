const express = require("express");
const router = express.Router();
const categoryController = require("../../controllers/category");
const auth = require("../../middlewares/auth")
const isAdmin = require("../../middlewares/isAdmin")

// router.post("/", auth, isAdmin, categoryController.addCategory);
router.post("/addCategory", categoryController.addCategory);
router.post("/:id?/updateCategory", categoryController.updateCategory);

router.get("/:id?", auth, categoryController.getCategory);

module.exports = router;