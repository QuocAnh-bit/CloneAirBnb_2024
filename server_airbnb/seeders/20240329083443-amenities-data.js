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
    const url = process.env.URL_GET_IMAGES + "amenities-svg/";
    const data = dataDemo.dataAmenity.map((item) => {
      item.img_name = url + item.img_name;

      return item;
    });
    await queryInterface.bulkInsert("amenities", data, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("amenities", null, {});
  },
};
