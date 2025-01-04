const mongoose = require('mongoose');

const hotelbookingSchema = new mongoose.Schema({
    user: {type:mongoose.Schema.Types.ObjectId, required: true},
    hotel: {type:mongoose.Schema.Types.ObjectId, required:true, ref: 'Hotel'},
    checkIn: {type:Date, required:true},
    checkOut: {type:Date, required:true},
    numGuests: {type:Number, required:true},
    name: {type:String, required:true},
    phoneNumber: {type:String, required:true},
    price: Number,
});

const HotelBookingModel = mongoose.model('HotelBooking', hotelbookingSchema);

module.exports = HotelBookingModel;