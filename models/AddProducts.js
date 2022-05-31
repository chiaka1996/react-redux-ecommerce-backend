const mongoose = require('mongoose');
const AddProducts= mongoose.Schema;

const AllProducts = new AddProducts({
    image: {
        type: String, 
        required: true
    },
    cloudinaryId:{
        type: String,
        required: true
    },
    productType: {
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
    subProduct: {
        type: String,
        required: true
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

const Products = mongoose.model('products', AllProducts);

module.exports = Products;