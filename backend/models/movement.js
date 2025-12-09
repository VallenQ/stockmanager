// models/movement.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Movement = sequelize.define('Movement', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    productId: { type: DataTypes.INTEGER, allowNull: false },
    type: { type: DataTypes.ENUM('entry','exit'), allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    note: { type: DataTypes.STRING, allowNull: true },
    previousStock: { type: DataTypes.INTEGER, allowNull: false },
    newStock: { type: DataTypes.INTEGER, allowNull: false }
  }, { timestamps: true });

  return Movement;
};
