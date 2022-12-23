const landings = require('./routes/landings')
const neas = require('./routes/neas')
const express = require('express')
const cors = require('cors')

require('dotenv').config()

const app = express()

require('./db')()

app.use(cors())
app.use(express.json())

app.use('/api/astronomy/landings', landings)
app.use('/api/astronomy/neas', neas)

app.get('/ping', (req, res) => {
    res.send('pong')
})

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Servidor corriendo en http://localhost:${port}`));