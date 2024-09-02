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
    const url = process.env.URL_GET_IMAGES + "categories-svg/";
    const data = dataDemo.dataCategory.map((item) => {
      item.category_img = url + item.category_img;
      delete item.id; // Xóa thuộc tính 'id'
      delete item.description; // Xóa thuộc tính 'description'
      return item; // Trả về phần tử đã được xóa thuộc tính
    });
    await queryInterface.bulkInsert("categories", data, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("categories", null, {});
  },
};
