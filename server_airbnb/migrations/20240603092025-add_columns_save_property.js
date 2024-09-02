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
      queryInterface.addColumn("properties", "add_structure", {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }),
      queryInterface.addColumn("properties", "add_privacy", {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }),
      queryInterface.addColumn("properties", "add_location", {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }),
      queryInterface.addColumn("properties", "add_floor_plan", {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }),
      queryInterface.addColumn("properties", "add_amenities", {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }),
      queryInterface.addColumn("properties", "add_photos", {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }),
      queryInterface.addColumn("properties", "add_title", {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }),
      queryInterface.addColumn("properties", "add_desc", {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }),
      queryInterface.addColumn("properties", "add_price", {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }),
      queryInterface.addColumn("properties", "add_receipt", {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }),
      queryInterface.addColumn("properties", "add_finish", {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }),
      queryInterface.addColumn("properties", "add_public", {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
      queryInterface.removeColumn("properties", "add_structure", {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }),
      queryInterface.removeColumn("properties", "add_privacy", {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }),
      queryInterface.removeColumn("properties", "add_location", {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }),
      queryInterface.removeColumn("properties", "add_floor_plan", {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }),
      queryInterface.removeColumn("properties", "add_amenities", {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }),
      queryInterface.removeColumn("properties", "add_photos", {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }),
      queryInterface.removeColumn("properties", "add_title", {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }),
      queryInterface.removeColumn("properties", "add_desc", {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }),
      queryInterface.removeColumn("properties", "add_price", {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }),
      queryInterface.removeColumn("properties", "add_receipt", {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }),
      queryInterface.removeColumn("properties", "add_finish", {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }),
      queryInterface.removeColumn("properties", "add_public", {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }),
    ]);
  },
};
