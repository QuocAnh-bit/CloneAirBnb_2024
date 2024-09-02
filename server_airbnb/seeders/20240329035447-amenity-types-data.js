"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "amenity_types",
      [
        {
          type_name: "normal",
          desc: "",
          order: 1,
        },
        {
          type_name: "standout",
          desc: "Do you have any standout amenities?",
          order: 2,
        },
        {
          type_name: "safety",
          desc: "Do you have any of these safety items?",
          order: 3,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("amenity_types", null, {});
  },
};
