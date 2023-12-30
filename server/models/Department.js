const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    const Department = sequelize.define('Department', {
        DepartmentID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        DepartmentName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        Description: {
            type: DataTypes.TEXT,
        },
    },{ tableName:'Department' })

    return Department;
}