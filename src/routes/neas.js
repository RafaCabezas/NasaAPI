const Nea = require('../models/nea')
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    const neas = await Nea.find({ orbit_class: req.query.class }).select('designation period_yr')

    res.send(neas)
})

router.get("/date/", async (req, res) => {
    if (req.query.from && req.query.to) {
        res.send(await Nea.find({ discovery_date: { $gt: req.query.from, $lt: req.query.to } })
            .select("designation discovery_date period_yr"))
    }
    else if (req.query.from) {
        res.send(await Nea.find({ discovery_date: { $gte: req.query.from } })
            .select("designation discovery_date period_yr"))
    }
    else if (req.query.to) {
        res.send(await Nea.find({ discovery_date: { $lte: req.query.to } })
            .select("designation discovery_date period_yr"))
    }
    else {
        res.send(await Neas.find({}))
    }
})

router.post('/create', async (req, res) => {
    const nea = new Nea(req.body)

    const newNea = await nea.save()

    res.send(newNea)
})

router.put('/edit/:designation', async (req, res) => {
    const nea = await Nea.findOneAndUpdate({ designation: req.params.designation }, req.body)

    res.send(nea)
})

router.delete('/delete/:designation', async (req, res) => {
    const nea = await Nea.findOneAndDelete({ designation: req.params.designation })

    res.send(nea)
})

router.get('/', async (req, res) => {
    if (req.query.class) {
        console.log(req.query)
        const neas = await Nea.find({ $toLower: { orbit_class: `${req.query.class}` } }).select('designation period_yr')
        res.send(Nea)
    } else if (req.query.from && req.query.to) {
        console.log(req.query)
        const result = await Nea.find({ discovery_date: { $gte: req.query.from, $lt: req.query.to } })
        res.send(result).status(200)
    } else if (req.query.from) {
        console.log(req.query)
        const result = await Nea.find({ discovery_date: { $gte: req.query.from } })
        res.send(result).status(200)
    } else if (req.query.to) {
        console.log(req.query)
        const result = await Nea.find({ discovery_date: { $lt: req.query.to } })
        res.send(result).status(200)
    } else {
        res.send("No se han especificado parámetros de búsqueda").status(404)
    }
})

module.exports = router