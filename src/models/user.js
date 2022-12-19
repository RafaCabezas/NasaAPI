const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    nickname: String,
    email: String,
    picture: String,
    affiliatedNumber: { type: Number, unique: true, required: true },
    affiliationDate: Date,
    occupation: String,
    birthdate: Date,
    pneasDiscoveredha: [{ type: Schema.Types.ObjectId, ref: 'Nea' }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;