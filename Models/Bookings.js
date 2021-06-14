const mongoose = require('mongoose');

const OnlineBookingSchema = new mongoose.Schema({
    name : {
        type: String, 
        required: true,
        trim: true,  
    },
    lname : {
        type : String, 
        required: true, 
        trim: true, 
    }, 
    email : {
        type: String, 
        required: true, 
        trim : true
    }, 
    tel : {
        type: String, 
        required: true, 
        trim: true
    }, 
    date: {
        type: String, 
        required: true, 
    }, 
    store: {
        type: String, 
        required: true
    },
    submitDate: {
        type: String, 
        required: true, 
        trim: true
    }
})

module.exports = Booking = mongoose.model('onlinereservation', OnlineBookingSchema)