const { where } = require("sequelize");
const { Discount, Property, DiscountType } = require("../models/index");

module.exports = {
  getDiscounts: async (propertyId) => {
    try {
      // Check xem có phải lần propertyId đâu không ?
      const property = await Property.findOne({ where: { id: propertyId } });
      const check = await Discount.findOne({
        where: { property_id: property.id },
      });
      if (!check) {
        console.log("chạy");
        // Tìm xem có bao nhiêu loại giảm giá
        const discountTypes = await DiscountType.findAll({
          order: [["order"]],
        });
        // Thêm lần lượt các giá trị cho mã giảm giá
        for (const discountType of discountTypes) {
          let value;
          switch (discountType.type_name) {
            case "first 3 bookings":
              value = 20;
              break;
            case "7nights":
              value = 15;
              break;
            case "28nights":
              value = 20;
              break;
            default:
              value = 0;
          }
          await Discount.create({
            discount_type_id: discountType.id,
            value: value,
            property_id: property.id,
            status: true,
          });
        }
      }
      // Nếu lần đầu thì tạo ra tất cả discout theo mặc định
      // Nầu là các lần khác thì đổi trang thái của các

      const discounts = await Discount.findAll({
        where: { property_id: property.id },
        order: [["created_at"]],
        include: [
          {
            model: DiscountType,
            as: "discount_type",
          },
        ],
      });
      // console.log(discounts);
      return discounts;
    } catch (error) {
      console.log(error, "errr");
      return false;
    }
  },
  addDiscounts: async (idProperty, discounts) => {
    try {
      const property = await Property.findOne({ where: { id: idProperty } });
      await property.update({ add_receipt: true });
      discounts = discounts.sort((a, b) => a.order - b.order);
      if (!property) {
        throw Error("Id Khoong ton tai");
      }
      if (property && discounts) {
        if (
          discounts[1]?.status &&
          discounts[2]?.status &&
          discounts[1].value !== 0 &&
          discounts[2].value !== 0 &&
          discounts[1].value > discounts[2].value &&
          discounts[2]?.value < discounts[1]?.value
        )
          throw error;
        for (let i = 0; i < discounts.length; i++) {
          await Discount.update(
            {
              value: discounts[i].value,
              status: discounts[i].value === 0 ? false : discounts[i].status,
            },
            { where: { id: discounts[i].discount_id } }
          );
        }
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};
