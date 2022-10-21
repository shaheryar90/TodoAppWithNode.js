const express = require("express");
const router = express.Router();
const dataController = require("../../controllers/task");
const auth = require("../../middlewares/auth")
const isAdmin = require("../../middlewares/isAdmin")

// router.post("/", auth, isAdmin, categoryController.addCategory);
router.post("/addData",auth,  dataController.addData);
router.post("/:id?/updateData",  dataController.updateData);
router.delete("/:id?/deleteData",  dataController.deleteData);

// router.get("/:id?", auth,  dataController.getData);

module.exports = router;