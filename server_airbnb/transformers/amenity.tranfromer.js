const Transformer = require("../core/Transformer");

class AmenityTransformer extends Transformer {
  response(instance) {
    return {
      amenityType: instance.amenityType,
      desc: instance.desc,
      dataAmenities: instance.data.map((item) => ({
        id: item.id,
        amenityTypeId: item.amenity_type_id,
        imgName: item.img_name,
        name: item.name,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
      })),
      order: instance.order,
    };
  }
}
module.exports = AmenityTransformer;
