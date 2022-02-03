const Response = require("../utils/Response");
const validation = require("../validations/validation");
const User = require("../models/User");
const { userRole } = require("../config/constants");
const jwt = require("../utils/jwt")
const bcryptjs = require("bcryptjs");

module.exports = {
  signUp: async (req, res) => {
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
      req.body.imageUrl = `http://${req.headers.host}/${req.file.path}`;
      let user = await User.create({
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password,
        roleId: userRole,
        imageUrl: req.body.imageUrl
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
      if(req.body.platform === "dashboard" && userExist.roleId == userRole){
        return res.status(401).send(Response.failure(401, "You are not allowed to access this route"))
      }
      const isCorrectPasword = await bcryptjs.compare(req.body.password, userExist.password);
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
  }
}