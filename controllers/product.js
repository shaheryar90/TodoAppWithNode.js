const Response = require("../utils/Response");
const validation = require("../validations/validation");
const Product = require("../models/Product");

module.exports = {
	addImage: async (req, res) => {
		console.log(req.body,"sdhasjkdhaskjdas")
		try {
	// 		// const {
	// 		// 	error
	// 		// } = validation.validateAddProduct(req.body)
	// 		if (error) {
	// 			// return res.status(400).send(Response.failure(400, error.details[0].message));
	// 		}
      req.body.imageUrl = `http://${req?.headers?.host}/${req.file.path}`;
			const product = await Product.create({
				// name: req.body.name,
				// categoryId: req.body.categoryId,
				// description: req.body.description,
				// price: req.body.price,
				imageUrl: req.body.imageUrl
			})
			return res.status(201).send(Response.success(201, product))
		} catch (error) {
			console.log(error)
			return res.status(500).send(Response.failure(500, "Server Error"))
		}
	},



	addProduct: async (req, res) => {
		console.log(req.body,"sdhasjkdhaskjdas")
		try {
	// 		// const {
	// 		// 	error
	// 		// } = validation.validateAddProduct(req.body)
	// 		if (error) {
	// 			// return res.status(400).send(Response.failure(400, error.details[0].message));
	// 		}
    //   req.body.imageUrl = `http://${req.headers.host}/${req.file.path}`;
			const product = await Product.create({
				name: req.body.name,
				categoryId: req.body.categoryId,
				description: req.body.description,
				price: req.body.price,
				// imageUrl: req.body.imageUrl
			})
			return res.status(201).send(Response.success(201, product))
		} catch (error) {
			console.log(error)
			return res.status(500).send(Response.failure(500, "Server Error"))
		}
	},
	getProduct: async (req, res) => {
		console.log(req.params)
		try {
			let product;
			if (req.params.id) {
				product = await Product.findOne({ categoryId : req.params.id});
			} else {
				product = await Product.find({});
			}
			return res.status(200).send(Response.success(200, product))
		} catch (error) {
			console.log(error)
			return res.status(500).send(Response.failure(500, "Server Error"))
		}
	},
	deleteProduct: async (req, res) => {
		console.log(req.params)
		try {
			let product;
			if (req.params.id) {
				console.log(req.params,"LLLLL")
				product = await Product.findOneAndRemove({ categoryId: req.params.id });
			} else {
				product = await Product.find({});
			}
			return res.status(200).send(Response.success(200, product))
		} catch (error) {
			console.log(error)
			return res.status(500).send(Response.failure(500, "Server Error"))
		}
	},
}