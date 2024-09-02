"use strict";
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("properties", "category_id", {
        type: Sequelize.INTEGER,
        references: {
          model: "categories",
          key: "id",
        },
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("properties", "category_id"),
    ]);
  },
};
