const mongoose = require('mongoose');

async function connection() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/nasaAPI');

        // 1. Scheme - Forma que toma el documento en la base de datos (propiedades y tipos)
        const landingSchema = new mongoose.Schema({
            tags: Array,
            date: Date,
            name: String,
            author: String,
            isPublished: Boolean,
            price: { type: Number, required: false }
        });

        // 2. Modelo de mongoose
        const Landing = mongoose.model('Landing', landingSchema);

        // 3. Insert - Crear documento en colección
        const arr = [{
            tags: ["express", "backend"],
            date: "2018-01-24T21:42:27.388Z",
            name: "Express.js en 3 días",
            author: "Ana",
            isPublished: true,
            price: 10
        }, {
            tags: ["node", "backend"],
            date: "2018-01-24T21:42:47.912Z",
            name: "Node.js en 2 días",
            author: "Ana",
            isPublished: true,
            price: 20
        }];

        Landing.insertMany(arr, function (error, docs) { });

        console.log("Done!");

    } catch (err) {
        console.log("Something went wrong", err);
    }
}

connection();