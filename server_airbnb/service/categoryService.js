const { where } = require("sequelize");
const { Category } = require("../models/index");
module.exports = {
  getCategories: async () => {
    try {
      const categories = await Category.findAll({
        order: [["created_at", "desc"]],
      });
      return categories;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};
