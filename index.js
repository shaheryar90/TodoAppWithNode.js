require("dotenv").config()
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { MONGO_URL } = require("./config/config");
const cors = require('cors');

mongoose.connect(MONGO_URL,
  {
    useNewUrlParser: true,
    // useUnifiedTopologIy: true
  })
  .then(() => {
    console.log("Mogodb Connected")
  })
  .catch((error) => {
    console.log("Error connection Mongodb details: ", error)
  });

app.use(cors())
app.use(express.static('public'));
app.use("/public", express.static('public'));

app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());

require("./startup/routes")(app);

const port = process.env.PORT || 3002
app.listen(port, () => {
  console.log("server is running at port: ", port);
})
