const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
    const Doctor = sequelize.define('Doctor', {
        DoctorID: {
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
        Specialization: {
            type: DataTypes.STRING,
        },
        Password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        UserType: {
            type: DataTypes.STRING,
            defaultValue: 'doctor',
        },
        DepartmentID : {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },{ tableName:'Doctor' });

    Doctor.belongsTo(sequelize.models.Department, {foreignKey:'DepartmentID'})

    // Hash the password before saving it to the database
    Doctor.beforeCreate(async (doctor) => {
        const hashedPassword = await bcrypt.hash(doctor.Password, 10);
        doctor.Password = hashedPassword;
    });

    return Doctor;
};