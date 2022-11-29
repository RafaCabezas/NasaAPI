const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    tags: Array,
    date: Date,
    name: String,
    author: String,
    isPublished: Boolean,
    price: { type: Number, required: false }
});

const Course = mongoose.model('Course', courseSchema)

async function connection() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/landings');
        console.log("Working!");
    } catch (err) {
        console.log("Fatal error", err);
    }
}

async function exercise1() {
    // Obten todos los cursos de backend publicados ordenados por su nombre. Selecciona solo su nombre y su autor
    await connection();

    const result = await Course.find({tags: 'backend'}, {isPublished: true})
        .sort('name')
        .select('name author')

    console.log(result);
}

async function exercise2() {
    // Obten todos los cursos de backend y frontend publicados, ordenados por precio en orden 
    // descendente y ordenados por su nombre. Selecciona solo su nombre, su autor y el precio.
    await connection();

    const result = await Course.find({$and: [{$or: [{tags: 'backend'}, {tags: 'frontend'}]}, {isPublished: true} ]})
        .sort({price: 'desc', name: 'asc'})
        .select('name author price')

    console.log(result);
}

async function exercise3() {
    // Obten todos los cursos publicados que cuesten 15 o más dolares o que tengan en su titulo la palabra días
    await connection();

const result = await Course.find({$and: [{isPublished: true}, {$or: [{price: {$gt: 14}}, {name: {$regex: /.*días.*/  }}]}]})
        .select('name price')

    console.log(result);
}

// exercise1(); 
// exercise2();
 exercise3();



// Operadores de comparación   https://www.mongodb.com/docs/manual/reference/operator/query-comparison/

    //const result = await Movie.find({plot: 'Maravillosa'})
    //const result = await Movie.find({ plot: {$ne: 'Maravillosa'}})

    //const result = await Movie.find({title: {$regex: /^Terminator/}})

    //const result = await Movie.find({price: {$lte: 40, $gt: 35 }})

    //const result = await Movie.find({price: {$in: [10, 20, 40, 100]}})

    // REGEX COMPARATOR
    // -----------------------
    //const result = await Movie.find({imagen: {$regex: /.*.jpg$/}})

    // LOGICOS COMPARATOR
    // -----------------------
    // https://www.mongodb.com/docs/manual/reference/operator/query-logical/

    //Cuando el precio > 35  OR actors != Arnaldo

    //const result = await Movie.find({$or: [{price: {$gt: 35}},{actors: { $ne:'Arnaldo Schwaznegger'}}]})

    //const result = await Movie.find({$and: [{price: {$gt: 35}},{actors: { $ne:'Arnaldo Schwaznegger'}}]})

    // LIMIT AND SORTING
    // -----------------------
    // const result = await Movie.find({})
    //                           .sort({price: -1})
    //                           .limit(1)

    //const result = await Movie.find({})
    // .sort('price')
    // .limit(1)     

    //const result = await Movie.find({})
    //.sort('price title')
    // COUNTING
    // -----------------------
    // const result = await Movie.find({})
    //                            .sort('price title')
    //                           //.limit(2)
    //                           .count()

    // SELECCIONAR CAMPOS
    // -----------------------
    // const result = await Movie.find({})
    //                           .sort('price title')
    //                           .select({title: 1})