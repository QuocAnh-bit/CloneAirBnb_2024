const { Discount, Property, DiscountType } = require("../models/index");

module.exports = {
  getDiscountTypes: async () => {
    try {
      const discountTypes = await DiscountType.findAll({
        order: [["order"]],
        include: [
          {
            model: Discount,
            as: "discounts",
          },
        ],
      });
      console.log(discountTypes, "a232");
      return discountTypes;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};
