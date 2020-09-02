const mongoose = require('mongoose');

const Orders = mongoose.Schema;

const getOrders = new Orders({
    username : {type : String, required: true}
},
{
    timestamps : true
}); 

const get_Orders = mongoose.model('get_Orders', getOrders);

module.exports = get_Orders;