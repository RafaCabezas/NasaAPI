const User = require('../models/user')
const express = require('express')

app.get('/', async (req, res) => {
    let query = "", error = {};

    if (req.query.email) {
        query = '{ orbit_class: req.query.class }';
        error = {
            code: 404,
            message: 'No hay usuarios con ese email.'
        };
    } else {
        error = {
            code: 500,
            message: 'Ha debido fallar algo. Lo sentimos'
        };
    }

    const neas = await User.find(query).select('name')

    res.send(neas)
})