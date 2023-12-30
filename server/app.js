const express = require('express')
require('./config/connection')

const app = express()
app.use(express.json())

const PORT = 5000 || process.env.PORT
app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`)
})