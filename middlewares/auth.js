const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../config/config")
const Response = require("../utils/Response");

module.exports = function (req, res, next) {
    const token = req.header('x_auth_token')
    if (!token) return res.status(401).send(Response.failure(401, "Access denied no token provided"))
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded
        next()
    } catch (ex) {
        res.status(401).send(Response.failure(401, "Invalid code"))
    }
}