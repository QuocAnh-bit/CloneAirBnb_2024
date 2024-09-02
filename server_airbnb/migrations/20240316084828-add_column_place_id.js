"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("properties", "place_type_id", {
        type: Sequelize.INTEGER,
        references: {
          model: "place_types",
          key: "id",
        },
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("properties", "place_type_id"),
    ]);
  },
};
