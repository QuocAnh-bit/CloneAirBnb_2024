const amenityService = require("../service/amenitiesService");
const AmenityTransformer = require("../transformers/amenity.tranfromer");
module.exports = {
  index: async (req, res) => {
    const response = {};
    const amenities = await amenityService.getAmenities();

    if (!amenities) {
      Object.assign(response, {
        status: 400,
        message: "Bad request",
      });
    } else {
      Object.assign(response, {
        status: 200,
        message: "SUCCESS",
        data: new AmenityTransformer(amenities),
      });
    }
    res.status(response.status).json(response);
  },
  handleAdd: async (req, res) => {
    const response = {};
    const { amenities, idProperty } = req.body;
    const amenitiesAdd = await amenityService.addAmenities(
      idProperty,
      amenities
    );
    if (!amenitiesAdd) {
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
