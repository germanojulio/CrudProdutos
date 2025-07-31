'use strict'

/** @type {import('sequelize-cli').Seed} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('products', [
      { name: 'Copo', price: 10.5, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Caneca', price: 15.0, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Caderno', price: 9.0, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Lápis', price: 1.25, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Mouse', price: 46.0, createdAt: new Date(), updatedAt: new Date() }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {})
  }
}