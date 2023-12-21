const { Sequelize} = require('sequelize');
const config = require('./config')

const sequelize = new Sequelize(config.development);
// const Department = require('../models/Department')(sequelize);
// const Doctor = require('../models/Doctor')(sequelize);
// const Patient = require('../models/Patient')(sequelize);
// const Appointment = require('../models/Appointment')(sequelize);

// database connection
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection to the database has been established successfully.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });
    
    // Doctor.findAll().then(doctors => {
    //     console.log(doctors);
    // }).catch(error => {
    //     console.error('Error querying doctors:', error);
    // });
// Sync
sequelize
    .sync({ force: false, logging: false,alter: true})
    .then(() => {
        console.log('Database has been synchronized successfully.');
    })
    .catch((error) => {
        console.error('Unable to synchronize the database:', error);
    });

    module.exports = {
        sequelize,
    };
