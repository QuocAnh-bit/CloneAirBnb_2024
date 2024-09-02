const Transformer = require("../core/Transformer");

class DiscountTransformer extends Transformer {
  response(instance) {
    return {
      id: instance.id,
      propertyId: instance.property_id,
      value: instance.value,
      status: instance.status,
      discountTypeId: instance.discount_type_id,
      ...(instance.discount_type
        ? {
            discountType: {
              id: instance.discount_type.id,
              desc: instance.discount_type.desc,
              edit: instance.discount_type.edit,
              order: instance.discount_type.order,
              title: instance.discount_type.title,
              typeName: instance.discount_type.type_name,
            },
          }
        : {}),
      createdAt: instance.created_at,
      updatedAt: instance.updated_at,
    };
  }
}
module.exports = DiscountTransformer;
