const express = require("express");
const router = express.Router();
const authController = require('../../controllers/auth');
const UploadFile = require("../../services/UploadFiles");
const uploads = UploadFile.uploadImage()
// const auth = require("../../middlewares/auth")
// const isBanned = require("../../middlewares/isBanned")

/**
 * Below route is used to register a user in web app
 * it @returns x-auth-token in headers where as user basic info in body of the response
 */

router.post("/signup", uploads.single("image"), authController.signUp);

router.post("/login", authController.login);
// /**
//  * This route is use to send verificatin code to the email for changing password
//  */
// router.post("/forget-password", authController.forgetPassword);
// /**
//  * This route is use to update password
//  */
// router.post("/reset-password", authController.resetPassword);

// router.post("/change-password", auth, isBanned, authController.changePassword);

module.exports = router;