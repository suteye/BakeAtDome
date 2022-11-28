const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const ProductSchema = mongoose.Schema({
    category: {
        type: String,
    },
    name: {
        type: String,
    },
    price: {
        type: String,
    },
    quantity: {
        type: Number
    },    
    image: {
        type: String,
    },
    productStatus: {
        type: String,
        //status: 1 = พร้อมขาย, 2 = หมดสต๊อก, 3 = ไม่พร้อมขาย
        default: 1,
    },
})

autoIncrement.initialize(mongoose.connection);
ProductSchema.plugin(autoIncrement.plugin, 'products');

const products = mongoose.model('products', ProductSchema);

module.exports = products;