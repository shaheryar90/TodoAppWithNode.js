const Response = require("../utils/Response");
const validation = require("../validations/validation");
const Product = require("../models/Product");
const fs = require("fs")
const FormData = require("form-data")
const axios = require("axios")
var mongoose = require('mongoose');

const { Types: { ObjectId } } = mongoose

module.exports = {
	addImage: async (req, res) => {
		console.log(req.body, "sdhasjkdhaskjdas")
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
	skinImage: async (req, res) => {
		console.log(req.file, "sdhasjkdhaskjdas")
		try {
			const apiKey = process.env.API_KEY
			console.log("api key ", apiKey)
			const apiUrl = "https://autoderm.firstderm.com/v1/query"
			const formData = new FormData();
			const imageContents = fs.createReadStream(req.file.path)
			formData.append('file', imageContents);
			const formHeaders = formData.getHeaders()

			const res = axios({
				method: "POST", url: apiUrl, data: formData,
				// You need to use `getHeaders()` in Node.js because Axios doesn't
				// automatically set the multipart form boundary in Node.
				headers: {
					// ...requestHeaders
					...formHeaders,
					"Api-Key": apiKey
				},
			}).then(function (response) {
				// handle success
				// print the full response data
				console.log(response);

				// print only the results
				console.log(response.data);
			})
				.catch(function (response) {
					// handle error
					console.log(response);
				});;







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
		console.log(req.body, "sdhasjkdhaskjdas")
		try {
					const {
						error
					} = validation.validateAddProduct(req.body)
					if (error) {
						return res.status(400).send(Response.failure(400, error.details[0].message));
					}
			//   req.body.imageUrl = `http://${req.headers.host}/${req.file.path}`;
			const product = await Product.create({
				name: req.body.name,
				// categoryId: req.body.categoryId,
				// description: req.body.description,
				// price: req.body.price,
				// imageUrl:"https://static.toiimg.com/photo/msid-74994072/74994072.jpg?158648"
			})
			return res.status(201).send(Response.success(201, product))
		} catch (error) {
			console.log(error)
			return res.status(500).send(Response.failure(500, "Server Error"))
		}
	},
	getProduct: async (req, res) => {
		try {
			let product;
			product = await Product.find({})
			console.log(product,"PRODUCT==>")
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
			if (ObjectId.isValid(req.params.id)) {

				var data = await Product.findOne({ _id: ObjectId(req.params.id) })
				console.log(data, "dattatat==>")
				if (data) {
					product = await Product.findOneAndRemove({ _id: ObjectId(req.params.id) })
					return res.status(200).send(Response.success(200, product, "Product has been deleted"))
				}
				else {
					return res.status(400).send(Response.failure(400, "incorrect id"));

				}

			}

			else {
				return res.status(400).send(Response.failure(400, "incorrect id"));

			}
			// if (req.params.id) {
			// 	console.log(req.params, "LLLLL")
			// 	product = await Product.findOneAndRemove({ categoryId: req.params.id });
			// } else {
			// 	product = await Product.find({});
			// }

		}
		catch (error) {
			console.log(error)
			return res.status(500).send(Response.failure(500, "Server Error"))
		}
	},
	updateProduct: async (req, res) => {
		try {
			let product
			const { name,
				// categoryId,
				// description,
				// price
			} = req.body
			console.log('req===>',)
			if (ObjectId.isValid(req.params.id)) {

				var data = await Product.findOne({ _id: ObjectId(req.params.id) })
				if (data) {
					if (name ) {
						const ab = Product.findOneAndUpdate({ _id: ObjectId(req.params.id) },
							{ name },
							{ new: true }



						).then((resposneee => {
							return res.status(200).send(Response.success(200, resposneee))
						}));
					}
					else {
						return res.status(400).send(Response.failure(400, "Required field can not be left empty"));


					}


				}
				else {
					return res.status(400).send(Response.failure(400, "incorrect id"));


				}
			}
			else {
				return res.status(400).send(Response.failure(400, "incorrect id"));


			}


		} catch (error) {
			console.log(error)
			return res.status(500).send(Response.failure(500, "Server Error"))
		}
	},
}