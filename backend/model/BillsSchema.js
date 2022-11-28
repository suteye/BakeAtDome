const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const BillSchema = mongoose.Schema({
    billId: {type: String},
    total: {type: Number },
    paymentMethod: {type: String},
    cartItems: {type: Array}
},{
    timestamps: true
})
    
autoIncrement.initialize(mongoose.connection);
BillSchema.plugin(autoIncrement.plugin, 'bills');

const bills = mongoose.model('bills', BillSchema);

module.exports = bills;


