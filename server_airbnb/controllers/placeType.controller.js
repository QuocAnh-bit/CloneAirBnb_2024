const placeTypeService = require("../service/placeTypeService");
const PlaceTypeTransformer = require("../transformers/placeType.tranformer");

module.exports = {
  index: async (req, res) => {
    const response = {};
    const placeTypes = await placeTypeService.getPlaceTypes();
    if (!placeTypes) {
      Object.assign(response, {
        status: 400,
        message: "Bad request",
      });
    } else {
      Object.assign(response, {
        status: 200,
        message: "SUCCESS",
        data: new PlaceTypeTransformer(placeTypes),
      });
    }
    res.status(response.status).json(response);
  },
};
