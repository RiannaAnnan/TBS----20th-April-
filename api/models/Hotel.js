const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    hotelid: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
    title: String,
    location: String, 
    address: String, 
    description: String,
    photos: [String],
    features: [String], 
    extraInfo: String,
    checkIn: Number,
    checkOut: Number,
    maxGuests: Number,
    price: Number,
});

const HotelModel = mongoose.model('Hotel', hotelSchema);

module.exports = HotelModel;