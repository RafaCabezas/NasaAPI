const mongoose = require('mongoose');

const neaSchema = new mongoose.Schema({
    designation: String,
    discovery_date: String,
    h_mag: String,
    moid_au: String,
    q_au_1: String,
    q_au_2: String,
    period_yr: String,
    i_deg: String,
    pha: String,
    orbit_class: String
});

const Nea = mongoose.model('Nea', neaSchema);

module.exports = Nea;