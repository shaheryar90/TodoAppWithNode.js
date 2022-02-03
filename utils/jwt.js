const maxAge = '7d';
const { JWT_SECRET } = require("../config/config")
const jwt = require('jsonwebtoken');

module.exports.createToken = (payload) => {
    return jwt.sign({payload}, JWT_SECRET, {
        expiresIn: maxAge
    });
}