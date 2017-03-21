const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    city: String,
    area: String,
    date: String,
    user: String,
    item: String,
    address: String
});


const ServiceAreas = mongoose.model('ServiceAreas', serviceSchema);

module.exports = ServiceAreas;