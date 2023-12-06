const DataTypes = require('sequelize');
const sequelize = require('../../config/database');
const Stops = require('./Stops');
const Passenger = require('./Passenger');

module.exports = ((sequelize, DataTypes) => {
    const Boarding = sequelize.define('Boarding', {
        boardingID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        routeID: DataTypes.INTEGER,
        boardTime: DataTypes.DATE,
        stopID: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Stops', // Assuming Stops is another defined model
                key: 'stopID',
            }
        },
    }, {
        freezeTableName: true, 
        // I don't want to automatically pluralizes the model name
        // because I want to use the table name as 'Boarding' instead of "Boardings"
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    });
    Boarding.belongsTo(Stops, { 
        foreignKey: 'stopID'
    });
    Boarding.hasMany(Passenger, { 
        foreignKey: 'boardingID', 
        onDelete: 'cascade',
    });
    return Boarding;    
})(sequelize, DataTypes);


