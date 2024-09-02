const categoryService = require("../service/categoryService");
const CategoryTransformer = require("../transformers/category.transformer");

module.exports = {
  index: async (req, res) => {
    const response = {};

    const categories = await categoryService.getCategories();

    if (!categories) {
      Object.assign(response, {
        status: 400,
        message: "Bad request",
      });
    } else {
      Object.assign(response, {
        status: 200,
        message: "SUCCESS",
        data: new CategoryTransformer(categories),
      });
    }
    res.status(response.status).json(response);
  },
};
