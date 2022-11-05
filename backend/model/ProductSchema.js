const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const ProductSchema = mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    size: {
        type: String,
        required: true
    },    
    image: {
        type: String,
        required: true
    },
})

autoIncrement.initialize(mongoose.connection);
ProductSchema.plugin(autoIncrement.plugin, 'products');

const products = mongoose.model('products', ProductSchema);

module.exports = products;