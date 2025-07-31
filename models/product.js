'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {}

  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'products'
  });

  return Product;
  
};