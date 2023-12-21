// models/Appointment.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Appointment = sequelize.define('Appointment', {
        AppointmentID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        PatientID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        DoctorID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        AppointmentDateTime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        Status: {
            type: DataTypes.STRING(20),
        },
        Notes: {
            type: DataTypes.TEXT,
        },
        Prescription: {
            type: DataTypes.TEXT,
        },
        AppointmentDuration: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    }, { tableName:'Appointment' });

      // Define associations
    Appointment.belongsTo(sequelize.models.Patient, { foreignKey: 'PatientID' });
    Appointment.belongsTo(sequelize.models.Doctor, { foreignKey: 'DoctorID' });

    return Appointment;
};
