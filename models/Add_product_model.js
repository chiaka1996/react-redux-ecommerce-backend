const mongoose = require('mongoose');

const AddProductSchema = mongoose.Schema;

const products = new AddProductSchema({
    image : {type : String, required : true},
    design : {type : String, required: true},
    price : { type : Number, required : true },
    size : {type : String, required : true},
    quantity : {type : Number, required : true},
    productType : {type : String},
    status : {type : Boolean}, 
    availableQuantity : {type: Number, required: true},
    description : {type : String, required: true}
    
},
{
    timestamps : true
}); 

const Added_product = mongoose.model('Added_product', products);

module.exports = Added_product;