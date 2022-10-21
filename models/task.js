const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name']
    },
    
    age: {
        type: Number,
        required: [true, 'Please enter a age']
    },

    parentData: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Task', dataSchema);
