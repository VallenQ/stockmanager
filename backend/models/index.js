const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', 'db.sqlite'),
  logging: false,
});

const User = require('./user')(sequelize);
const Product = require('./product')(sequelize);
const Supplier = require('./supplier')(sequelize);

// Relations
Supplier.hasMany(Product, { foreignKey: 'supplierId' });
Product.belongsTo(Supplier, { foreignKey: 'supplierId' });

module.exports = { sequelize, User, Product, Supplier };
