const discountTypesService = require("../service/discountTypeService");
module.exports = {
  index: async (req, res) => {
    const response = {};
    const discountTypes = await discountTypesService.getDiscountTypes();
    if (!discountTypes) {
      Object.assign(response, {
        status: 400,
        message: "Bad request",
      });
    } else {
      Object.assign(response, {
        status: 200,
        message: "SUCCESS",
        data: discountTypes,
      });
    }
    res.status(response.status).json(response);
  },
};
