const mongoose = require('mongoose')

module.exports = function () {
    // mongoose.connect('mongodb://127.0.0.1:27017/NasaAPI')
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log("Conectado a mongodb ..."))
        .catch((err) => console.log("ERROR FATAL: ", err))
}