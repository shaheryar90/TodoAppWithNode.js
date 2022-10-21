require("dotenv").config()
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { MONGO_URL } = require("./config/config");
const cors = require('cors');



//web-push
const webpush = require('web-push');

//body-parser
const bodyParser = require('body-parser');

//path
const path = require('path');

//using express 

//using bodyparser
app.use(bodyParser.json())
const publicVapidKey = "BCsL1ViBwupeqwUR6fj3L7N_tQmLMk74r5aBrl6gsAYEJmsDCGqw_lrji_ZCge8XoqPkdEMl5smbBPA1-hJ2nFQ"
const privateVapidKey= "apIRGSVJcewoK_FxzpAP32cEgG9PlpnF-Qzylk65Tz8";
webpush.setVapidDetails('mailto:mercymeave@section.com', publicVapidKey, privateVapidKey);
app.use(express.static(path.join(__dirname, "client")));

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

app.get('/',(req, res)=>{res.status(200).send({message: "It works now after change and merge.....!"})})
require("./startup/routes")(app);

const port = process.env.PORT || 3002
app.listen(port, () => {
  console.log("server is running at port: ", port);
})
