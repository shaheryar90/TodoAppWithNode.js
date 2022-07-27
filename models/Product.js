const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: [true, 'Required fields cannot be left empty']
    },
    categoryId: {
        type: String,
        // required: [true, 'Required fields cannot be left empty']
    },
    description: {
        type: String,
        // required: [true, 'Required fields cannot be left empty']
    },
    price: {
        type: Number,
        // required: [true, 'Required fields cannot be left empty']
    },
    imageUrl: {
        type: String,
        // required: [false, 'Required fields cannot be left empty']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Product', productSchema);
