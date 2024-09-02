const { PlaceType } = require("../models/index");
module.exports = {
  getPlaceTypes: async () => {
    try {
      const placeTypes = await PlaceType.findAll({
        order: [["created_at", "desc"]],
      });
      return placeTypes;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};
