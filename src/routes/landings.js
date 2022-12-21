const Landing = require('../models/landing')
const express = require('express')
const router = express.Router()

// router.get('/', async (req, res) => {
//     console.log(req.query)
//     const landings = await Landing.find().select('name')

//     res.send(landings)
// })

// router.get('/', async (req, res) => {
//     console.log(req.query)

//     const landings = await Landing.find({ mass: { $gt: req.query.minimum_mass } }).select('name mass')
//     res.send(landings)
// })

// router.get("/date/", async (req, res) => {
//     if (req.query.from && req.query.to) {
//         res.send(await Landing.find({ year: { $gte: req.query.from, $lte: req.query.to } })
//             .sort("year")
//             .select("name mass year"))
//     } else if (req.query.from) {
//         res.send(await Landing.find({ year: { $gte: req.query.from } }).select("name mass year"))
//     } else if (req.query.to) {
//         res.send(await Landing.find({ year: { $lte: req.query.to } }).select("name mass year"))
//     } else {
//         res.send(await Landing.find({}))
//     }
// })

router.get('/', async (req, res) => {
    if (req.query.minimum_mass) {
        const query = req.query.minimum_mass
        const result = await Landing.find({ $expr: { $gt: [{ $toDecimal: "$mass" }, +query] } })
        res.send(result).status(200)
    } else if (req.query.from && req.query.to) {
        const result = await Landing.find({ year: { $gte: req.query.from, $lt: req.query.to } })
        res.send(result).status(200)
    } else if (req.query.from) {
        const query = req.query.from
        console.log(req.query)
        const result = await Landing.find({ year: { $gte: query } })
        res.send(result).status(200)
    } else if (req.query.to) {
        const query = req.query.to
        console.log(query)
        const result = await Landing.find({ year: { $lt: query } })
        res.send(result).status(200)
    } else {
        res.send("No se han especificado parámetros de búsqueda").status(404)
    }
})

router.get('/list', async (req, res) => {
    const landings = await Landing.find({})

    res.send(landings)
})

router.get('/mass/:masa', async (req, res) => {
    console.log(req.params)

    const landings = await Landing.find({ mass: req.params.masa }).select('name mass')

    res.send(landings)
})

router.get('/class/:clase', async (req, res) => {
    console.log(req.params)

    const landings = await Landing.find({ recclass: req.params.clase }).select('name recclass')

    res.send(landings)
})

router.get('/mass/:masa', async (req, res) => {
    console.log(req.params)

    const landings = await Landing.find({ mass: req.params.masa }).select('name mass year')

    res.send(landings)
})

router.post('/create', async (req, res) => {
    const landing = new Landing(req.body)

    const newLanding = await landing.save()

    res.send(newLanding)
})

router.put('/edit/:id', async (req, res) => {
    const landing = await Landing.findOneAndUpdate({ id: req.params.id }, req.body)

    await res.send(req.body)
})

router.delete('/delete/:id', async (req, res) => {
    const landing = await Landing.findOneAndDelete({ id: req.params.id })

    res.send(landing)
})

module.exports = router