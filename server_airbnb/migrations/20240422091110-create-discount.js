"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("discounts", {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
      },
      property_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "properties", key: "id" },
      },
      discount_type_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: "discount_types", key: "id" },
      },
      value: {
        type: Sequelize.INTEGER,
      },
      // name: {
      //   type: Sequelize.STRING,
      // },
      // title: {
      //   type: Sequelize.STRING,
      // },
      // desc: {
      //   type: Sequelize.STRING,
      // },
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
    await queryInterface.dropTable("discounts");
  },
};
