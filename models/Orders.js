const mongoose = require('mongoose');

const Orders = mongoose.Schema;

const allOrders = new Orders({
    userId: {
        type: String,
         required: true
        },
    username: {
        type : String, 
        required: true
    },
    firstname: {
        type: String, 
        required: true
    },
    lastname: {
        type: String, 
        required: true
    },
    country: {
        type: String,
        required: true
    },
    local_gov_area: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    bus_stop: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    paymentType: {
        type: String,
        required: true
    },
    address: {
        type: String, 
        required: true
    },
    phone: {
        type: Number, 
        required: true
    },
    total: {
        type: Number, 
        required: true
    },
    status: {
        type:Boolean, 
        required:true
    },
    order: {
        type: Array, 
        required:true
    }
    
},
{
    timestamps : true
}); 

const all_Orders = mongoose.model('all_Orders', allOrders);

module.exports = all_Orders;