const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {

    const attributes = {
        name: { type: DataTypes.STRING, allowNull: true },
        username: { type: DataTypes.STRING, allowNull: true },
        password: { type: DataTypes.STRING, allowNull: true },
        role: { type: DataTypes.STRING, allowNull: true },
        refresh_token: { type: DataTypes.STRING, allowNull: true },
        
    };
    const options = {};
    return sequelize.define('user', attributes, options);
}
