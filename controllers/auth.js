const Response = require("../utils/Response");
const validation = require("../validations/validation");
const User = require("../models/User");
const { userRole } = require("../config/constants");
const jwt = require("../utils/jwt")

const nodemailer = require('nodemailer');
const bcryptjs = require("bcryptjs");
var val = Math.floor(1000 + Math.random() * 9000).toString()
module.exports = {
  
  signUp: async (req, res) => {
    console.log(req.body, "imagjdsaghgd")
    try {
      const {
        error
      } = validation.validateSignup(req.body)
      if (error) {
        return res.status(400).send(Response.failure(400, error.details[0].message));
      }
      const userExist = await User.findOne({ email: req.body.email })
      if (userExist) {
        return res.status(400).send(Response.failure(400, "Email is already taken."))
      }
      
      // req.body.imageUrl = `http://${req.headers.host}/${req.file.path}`;
      let user = await User.create({
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password,
        roleId: userRole,
        // imageUrl: req.body.imageUrl
      })
      return res.status(201).send(Response.success(201, user))
    } catch (error) {
      console.log(error)
      return res.status(500).send(Response.failure(500, "Server Error"))
    }
  },
  login: async (req, res) => {
    try {
      const {
        error
      } = validation.validateLogin(req.body)
      if (error) {
        return res.status(400).send(Response.failure(400, error.details[0].message));
      }
      let userExist = await User.findOne({ email: req.body.email }).lean()
      if (!userExist) {
        return res.status(400).send(Response.failure(400, "Invalid Email or Password."))
      }
      // if (req.body.platform === "dashboard" && userExist.roleId == userRole) {
      //   return res.status(401).send(Response.failure(401, "You are not allowed to access this route"))
      // }
      console.log(userExist.password,req.body.password,"pppppp")
      const isCorrectPasword = await bcryptjs.compare(req.body.password, userExist.password);
      console.log(isCorrectPasword,"sdkaskdaskdka")
      if (!isCorrectPasword) {

        return res.status(400).send(Response.failure(400, "Invalid Email or Password."))
      }
      
      delete userExist['password']
      userExist['x_auth_token'] = jwt.createToken(userExist)
      return res.status(200).send(Response.success(200, userExist))
    } catch (error) {
      console.log(error)
      return res.status(500).send(Response.failure(500, "Server Error"))
    }
  },
  forgetPassword: async (req, res) => {
    console.log(val,"req")
    // console.log(res.body,"res")
    try {
      let userExist = await User.findOne({ email: req.body.to }).lean()
      if (!userExist) {
        return res.status(400).send(Response.failure(400, "Invalid Email or Password."))
      }
      const transporter = nodemailer.createTransport({
        // host: 3002,
        service: "gmail",
        // port: 587,
        // secure: true,
        auth: {
          user: process.env.NODEMAILER_USERNAME,
          pass: process.env.NODEMAILER_PASSWORD,
        },
      });
      
      await transporter.sendMail({
        from: "shaheryar724@gmail.com",
        to: req.body.to,
        subject: req.body.subject,
        text:val ,
      });
      return res.status(200).send(Response.success(200, "email sent sucessfully"))
      console.log("email sent sucessfully");
    }
    catch (error) {
      console.log(error, "email not sent");
    }
  },
  verifyOtp: async (req, res) => {
    console.log(req.body, "imagjdsaghgd")
    try {
      // const {
      //   error
      // } = validation.validateSignup(req.body)
      console.log(val !== req.body.otp_value,req.body.otp_value,val,"ppppppp")
      if (val !== req.body.otp_value.toString()) {
        return res.status(400).send(Response.failure(400, "Invalid Otp"));
      }
    
      
      // req.body.imageUrl = `http://${req.headers.host}/${req.file.path}`;
      else {
        return res.status(200).send(Response.success(200,"OTP match successfully"))
      }
    } catch (error) {
      console.log(error)
      return res.status(500).send(Response.failure(500, "Server Error"))
    }
  },
  changePassword: async (req, res) => {
    console.log(req.body, "imagjdsaghgd")
    try {
      // const {
      //   error
      // } = validation.validateLogin(req.body)
      // if (error) {
      //   return res.status(400).send(Response.failure(400, error.details[0].message));
      // }
      const salt = await bcryptjs.genSalt();
      req.body.password = await bcryptjs.hash(req.body.password, salt);
      if(req.body.email){
        abc = await User.findOneAndUpdate({ email: req.body.email }, { password:req.body.password  }, {
          new:true
        });
        return res.status(200).send(Response.success(200,"password Change successfully"))
      }
      
      // req.body.imageUrl = `http://${req.headers.host}/${req.file.path}`;
     
    } catch (error) {
      console.log(error)
      return res.status(500).send(Response.failure(500, "Server Error"))
    }
  },
}