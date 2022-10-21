const Response = require("../utils/Response");
const validation = require("../validations/validation");
const Task = require("../models/task");
const task = require("../models/task");

module.exports = {
  addData: async (req, res) => {
    try {
      const {
        error
      } = validation.validateAddData(req.body)
      if (error) {
        return res.status(400).send(Response.failure(400, error.details[0].message));
      }
      const data = await Task.create({
        name: req.body.name,
        age: req.body.age,
        parentCategory: req.body.parentCategory
      })
      console.log(req.body, "sdhasjkdhaskjd")
      return res.status(201).send(Response.success(201, data))
    } catch (error) {
      console.log(error)
      return res.status(500).send(Response.failure(500, "Server Error"))
    }
  },
  updateData: async (req, res) => {
    console.log(req.params, "ppppppp")
    try {
      let data;
      if (req.params.id) {
        task = await Task.findOneAndUpdate({ _id: req.params.id }, { name: req.body.name }, {
          new: true
        });
      }
      else {
        data = await Task.find({});
      }
      return res.status(200).send(Response.success(200, data))
    } catch (error) {
      console.log(error)
      return res.status(500).send(Response.failure(500, "Server Error"))
    }
  },
  deleteData: async (req, res) => {
    console.log(req.params, "ppppppp")
    try {
      let data;
      if (req.params.id) {
        console.log(req.params, "LLLLL")
        data = await Task.findOneAndRemove({ categoryId: req.params.id });
      } else {
        data = await Task.find({});
      }
      return res.status(200).send(Response.success(200, data))
    }
    catch (error) {
      console.log(error)
      return res.status(500).send(Response.failure(500, "Server Error"))
    }
  },
  //   getData: async (req, res) => {
  //     try {
  //       let category;
  //       if(req.params.id){
  //         category = await Category.findById(req.params.id);
  //       }else{
  //         category = await Category.find({});
  //       }
  //       return res.status(200).send(Response.success(200, category))
  //     } catch (error) {
  //       console.log(error)
  //       return res.status(500).send(Response.failure(500, "Server Error"))
  //     }
  //   },
}