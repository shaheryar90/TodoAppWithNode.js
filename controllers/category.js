const Response = require("../utils/Response");
const validation = require("../validations/validation");
const Category = require("../models/Category");

module.exports = {
  addCategory: async (req, res) => {
    try {
      const {
        error
      } = validation.validateAddCategory(req.body)
      if (error) {
        return res.status(400).send(Response.failure(400, error.details[0].message));
      }
      const category = await Category.create({
          name: req.body.name,
          parentCategory: req.body.parentCategory
      })
      return res.status(201).send(Response.success(201, category))
    } catch (error) {
      console.log(error)
      return res.status(500).send(Response.failure(500, "Server Error"))
    }
  },
  updateCategory: async (req, res) => {
    console.log(req.params,"ppppppp")
    try {
      let category;
      if(req.params.id){
        category = await Category.findOneAndUpdate({ _id: req.params.id }, { name: "bilal" }, {
          new:true
        });
      }
      else {
        category = await Category.find({});
      }
      return res.status(200).send(Response.success(200, category))
    } catch (error) {
      console.log(error)
      return res.status(500).send(Response.failure(500, "Server Error"))
    }
  },
  getCategory: async (req, res) => {
    try {
      let category;
      if(req.params.id){
        category = await Category.findById(req.params.id);
      }else{
        category = await Category.find({});
      }
      return res.status(200).send(Response.success(200, category))
    } catch (error) {
      console.log(error)
      return res.status(500).send(Response.failure(500, "Server Error"))
    }
  },
}