const mongoose = require('mongoose');

const frontendRegistration = mongoose.Schema;

const registration = new frontendRegistration({
    firstname : {
        type : String, 
        required : true
    },
    lastname : {
        type : String, 
        required : true
    },
    username : {
        type : String, 
        required : true
    },
    phone : {
        type : Number, 
        required : true
    },
    email : {
        type : String, 
        required: true
    },
    state : {
        type : String, 
        required: true
    },
    address : {
        type : String, 
        required: true
    },
    password : { 
        type : String, 
        required : true 
    },
    gender: {
        type: String
    },
    birthday: {
        type: String
    },
    newsletter: {
        type: Boolean
    }
    
},
{
    timestamps : true
}); 

const frontend_registration = mongoose.model('frontendRegistration', registration);

module.exports = frontend_registration;