const discountService = require("../service/discountService");
const DiscountTransformer = require("../transformers/discount.tranformer");

module.exports = {
  index: async (req, res) => {
    const response = {};

    const discounts = await discountService.getDiscounts(req.params.propertyId);

    if (!discounts) {
      Object.assign(response, {
        status: 400,
        message: "Bad request",
      });
    } else {
      Object.assign(response, {
        status: 200,
        message: "SUCCESS",
        data: new DiscountTransformer(discounts),
      });
    }
    res.status(response.status).json(response);
  },
  handleAdd: async (req, res) => {
    const response = {};
    const { discounts, idProperty } = req.body;
    const discountsAdd = await discountService.addDiscounts(
      idProperty,
      discounts
    );
    if (!discountsAdd) {
      Object.assign(response, {
        status: 400,
        message: "Bad request",
      });
    } else {
      Object.assign(response, {
        status: 200,
        message: "SUCCESS",
      });
    }
    res.status(response.status).json(response);
  },
};
