// Conecta con la base de datos
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'nasaAPI'
});

const express = require('express');
const Joi = require('joi');

const app = express();

app.use(express.json());

app.get('/api/astronomy/landings', (req, res) => {
    let query = "", error = {};

    if (req.query.minimum_mass) {
        query = `SELECT * FROM meteoritos WHERE minimum_mass = "${req.query.minimum_mass}"`;
        error = { 
            code: 404,
            message: 'No hay meoteoritos con esa masa.'
        };
    } else {
        query = 'SELECT * FROM meteoritos';
        error = { 
            code: 500,
            message: 'Ha debido fallar algo. Lo sentimos'
        };
    }


    

    pool.query(query, (err, rows) => {
        if (!rows.length) {
            res.status(error.code).send(error.message);
            return // es igual que return false y lo que hace es salirse de la función
        }

        return res.status(200).json(rows);
    })
})


app.post('/api/authors', (req, res) => { 
    const {name, surname, email, img} = req.body;

    const schema = Joi.object({
        name: Joi.string().required(),
        surname: Joi.string().required(),
        email: Joi.string().required(),
        img: Joi.string().required()
    })

    const {error} = schema.validate(req.body);
    if (error) return res.status(401).json(error.details[0].message);

    pool.query(`INSERT INTO autores VALUES ("${name}", "${surname}", "${email}", "${img}", NULL)`, (err, rows) => {
        if(err) return res.status('500').send('Espera mentras solucionamos el error.')

        res.status(201).json({message: `usuario creado -> ${email}`});    
    })
})

app.listen(3000);