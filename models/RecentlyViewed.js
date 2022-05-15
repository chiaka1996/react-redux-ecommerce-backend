const mongoose = require('mongoose');
const RecentViewedSchema = mongoose.Schema;

const view = new RecentViewedSchema({
    image : {type : String, required : true},
    design : {type : String, required: true},
    price : { type : Number, required : true },
    size : {type : String, required : true},
    quantity : {type : Number, required : true},
    productType : {type : String},
    availableQuantity : {type: Number, required: true},
    description : {type : String, required: true}
    
},
{
    timestamps : true
}); 
const RecentViews = mongoose.model('recently_viewed_products', view);
module.exports = RecentViews;
