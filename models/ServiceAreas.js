const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    date: String,
    data: [{
        city: String,
        area: String,
        user: String,
        item: String,
        address: String
    }]
});


const ServiceAreas = mongoose.model('ServiceAreas', serviceSchema);

module.exports = ServiceAreas;