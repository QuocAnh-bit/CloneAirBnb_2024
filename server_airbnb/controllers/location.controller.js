const locationService = require("../service/locationService");

module.exports = {
  updateOfCreateLocation: async (req, res) => {
    const { id: propertyId } = req.params;
    console.log(req.body);
    const response = {};
    const location = await locationService.createLocation(req.body, propertyId);
    if (!location) {
      Object.assign(response, {
        status: 400,
        message: "Bad request",
      });
    } else {
      Object.assign(response, {
        status: 200,
        message: "SUCCESS",
        data: location,
      });
    }
    res.status(response.status).json(response);
  },
};
