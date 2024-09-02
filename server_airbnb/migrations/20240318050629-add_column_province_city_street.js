"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return Promise.all([
      queryInterface.addColumn("locations", "province", {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.addColumn("locations", "street", {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.addColumn("locations", "city", {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.addColumn("locations", "apartment", {
        type: Sequelize.STRING,
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return Promise.all([
      queryInterface.removeColumn("locations", "province", {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.removeColumn("locations", "street", {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.removeColumn("locations", "city", {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.removeColumn("locations", "apartment", {
        type: Sequelize.STRING,
      }),
    ]);
  },
};
