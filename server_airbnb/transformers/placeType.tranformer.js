const Transformer = require("../core/Transformer");

class PlaceTypeTransformer extends Transformer {
  response(instance) {
    return {
      id: instance.id,
      typeImg: instance.type_img,
      typeName: instance.type_name,
      typeTitle: instance.type_title,
      typeDesc: instance.type_desc,
      createdAt: instance.created_at,
      updatedAt: instance.updated_at,
    };
  }
}
module.exports = PlaceTypeTransformer;
