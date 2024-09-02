const {
  User,
  Property,
  Category,
  PropertyImage,
  Location,
  Country,
} = require("../models/index");
const { Op, where } = require("sequelize");
const Sequelize = require("sequelize");

module.exports = {
  profile: async (userId) => {
    try {
      const profile = await User.findByPk(userId);
      return profile;
    } catch (error) {
      return false;
    }
  },
  getProperties: async (userId, incomplete, query) => {
    try {
      const { q, limit, page } = query;
      const filters = {
        user_id: userId,
        ...(incomplete ? { add_finish: false } : {}),
      };
      if (q) {
        filters[Op.or] = {
          property_name: {
            [Op.iLike]: `%${q.trim()}%`,
          },
          // "$location.city$": {
          //   // Tham chiếu đến trường city trong mô hình Location
          //   [Op.iLike]: `%${q.trim()}%`,
          // },
        };
      }

      const options = {
        where: filters,
        order: [["add_photos", "desc"]],
        include: [
          {
            model: Category,
            as: "category",
          },
          {
            model: PropertyImage,
            as: "propertyImages",
          },
          {
            model: Location,
            as: "location",
            include: [
              {
                model: Country,
                as: "country",
              },
            ],
          },
        ],
        distinct: true,
      };

      if (limit && Number.isInteger(+limit)) {
        const offset = 0;
        options.limit = page * limit;
        options.offset = offset;
      }
      const { count, rows: properties } = await Property.findAndCountAll(
        options
      );

      properties.totalPages = Math.ceil(count / limit);
      properties.page = page;
      properties.limit = limit;
      properties.count = count - page * limit;

      return properties;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};
