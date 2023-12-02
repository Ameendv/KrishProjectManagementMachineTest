const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {

    const attributes = {
        title: { type: DataTypes.STRING, allowNull: true },
        release_date: { type: DataTypes.DATEONLY, allowNull: true },
        director: { type: DataTypes.STRING, allowNull: true },
        genre: { type: DataTypes.STRING, allowNull: true },
        trailer_url:{ type: DataTypes.STRING, allowNull: true },
        budget: { type: DataTypes.DECIMAL(15,2), allowNull: true },
        budget_unit: { type: DataTypes.STRING, allowNull: true },
    };
    const options = {};
    return sequelize.define('movies', attributes, options);
}
