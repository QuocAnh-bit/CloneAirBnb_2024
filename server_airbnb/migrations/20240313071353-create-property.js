"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("properties", {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
      },
      user_id: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: "users",
          },
          key: "id",
        },
      },
      location_id: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: "locations",
          },
          key: "id",
        },
      },
      property_name: {
        type: Sequelize.STRING,
      },
      desc: {
        type: Sequelize.STRING,
      },
      num_guests: {
        type: Sequelize.INTEGER,
      },
      num_beds: {
        type: Sequelize.INTEGER,
      },
      num_bedrooms: {
        type: Sequelize.INTEGER,
      },
      num_bathrooms: {
        type: Sequelize.INTEGER,
      },
      night_price: {
        type: Sequelize.FLOAT,
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
    await queryInterface.dropTable("properties");
  },
};
