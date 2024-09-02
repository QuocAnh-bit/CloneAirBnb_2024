const { Location, Country, Property } = require("../models/index");

module.exports = {
  createLocation: async (body, propertyId) => {
    try {
      const { apartment, city, province, street } = body;
      const [country, createdCountry] = await Country.findOrCreate({
        where: { country_name: body.country },
        defaults: {
          country_name: body.country,
        },
      });
      const property = await Property.findByPk(propertyId);

      if (property.location_id) {
        await Location.update(
          { apartment, city, province, street, country_id: country.id },
          { where: { location_id: property.location_id } }
        );
      } else {
        const location = await Location.create({
          apartment,
          city,
          province,
          street,
          country_id: country.id,
        });
        await Property.update(
          { location_id: location.id, add_floor_plan: true },
          {
            where: { id: propertyId },
          }
        );
      }

      // them vao property

      return property;
    } catch (error) {
      return false;
    }
  },
};
