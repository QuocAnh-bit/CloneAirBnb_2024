"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("countries", {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
      },
      country_name: {
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("countries");
  },
};