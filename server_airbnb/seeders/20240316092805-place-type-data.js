"use strict";
const dataDemo = require("../lib/data_demo");

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
    const url = process.env.URL_GET_IMAGES + "place-types/";
    const data = dataDemo.dataPlace.map((item) => {
      item.type_img = url + item.type_img;
      return item;
    });

    await queryInterface.bulkInsert("place_types", data, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("place_types", null, {});
  },
};
