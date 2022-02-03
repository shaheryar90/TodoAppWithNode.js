const authRoute = require("../routes/v1/auth");
const categoryRoute = require("../routes/v1/category");
const productRoute = require("../routes/v1/product");

module.exports = function (app) {
  app.use(`/dev/rms/api/v1/auth`, authRoute);
  app.use(`/dev/rms/api/v1/category`, categoryRoute);
  app.use(`/dev/rms/api/v1/product`, productRoute);
};