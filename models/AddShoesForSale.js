const mongoose = require('mongoose');

const AddShoeSchema = mongoose.Schema;

const  ShoeProducts = new AddShoeSchema({
    image: {
        type: String, 
        required: true
    },
    design: {
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
    quantity: {
        type: Number, 
        required: true
    },
    productType: {
        type: String
    },
    availableQuantity: {
        type: Number, 
        required: true
    },
    status: {
        type: Boolean
    }, 
    description: {
        type: String, 
        required: true
    }  
},
{
    timestamps : true
}); 

const AddShoe = mongoose.model('AddShoe', ShoeProducts);

module.exports = AddShoe;