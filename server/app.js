const express = require('express')
const { Sequelize } = require('sequelize')
const config = require('./config/config')

const app = express()
app.use(express.json())

const sequelize = new Sequelize(config.development);

// database connection
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection to the database has been established successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });
    sequelize.sync({ force: false, logging: false })
    .then(() => {
        console.log('Database has been synchronized successfully.');
    })
    .catch((error) => {
        console.error('Unable to synchronize the database:', error);
    });

const PORT = 5000 || process.env.PORT
app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`)
})