const mongoose = require('mongoose');

const landingSchema = new mongoose.Schema({
    name: String,
    id: Number,
    nametype: String,
    recclass: String,
    mass: Number,
    fall: String,
    year: String,
    reclat: Number,
    reclong: Number,
    geolocation: {latitude: String, longitude: String}
});

const Landing = mongoose.model('Landing', landingSchema);

module.exports = Landing;