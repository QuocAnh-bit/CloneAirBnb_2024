const Transformer = require("../core/Transformer");

class CategoryTransformer extends Transformer {
  response(instance) {
    return {
      id: instance.id,
      categoryImg: instance.category_img,
      categoryName: instance.category_name,
      categoryTitle: instance.category_title,
      createdAt: instance.created_at,
      updatedAt: instance.updated_at,
    };
  }
}
module.exports = CategoryTransformer;
