const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
    const Patient = sequelize.define('Patient', {
        PatientID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        FirstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        LastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Email: {
            type: DataTypes.STRING,
        },
        Phone: {
            type: DataTypes.STRING(20),
        },
        DateOfBirth: {
            type: DataTypes.DATE,
        },
        Gender: {
            type: DataTypes.CHAR(1),
        },
        Address: {
            type: DataTypes.TEXT,
        },
        Password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        UserType: {
            type: DataTypes.STRING,
            defaultValue: 'patient',
        },
    },{ tableName:'Patient' });

    // Hash the password before saving it to the database
    Patient.beforeCreate(async (patient) => {
        const hashedPassword = await bcrypt.hash(patient.Password, 10);
        patient.Password = hashedPassword;
    });

    return Patient;
};