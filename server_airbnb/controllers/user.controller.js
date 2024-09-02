const propertyService = require("../service/propertyService");
const usersService = require("../service/usersService");
const PropertyTransformer = require("../transformers/property.tranformer");

module.exports = {
  profile: async (req, res) => {
    const response = {};
    const profile = await usersService.profile(req.params.userId);
    if (!profile) {
      Object.assign(response, {
        status: 400,
        message: "Bad request",
      });
    } else {
      Object.assign(response, {
        status: 200,
        message: "SUCCESS",
        data: profile,
      });
    }
    res.status(response.status).json(response);
  },
  getProperties: async (req, res) => {
    const response = {};
    console.log(req.query, "query");
    const incomplete = req.url.includes("incomplete"); // Xử lý router check xem lấy tất cả hay lấy những thứ chưa hoàn thành

    const properties = await usersService.getProperties(
      req.params.userId,
      incomplete,
      req.query
    );

    console.log(properties);
    if (!properties) {
      Object.assign(response, {
        status: 400,
        message: "Bad request",
      });
    } else {
      Object.assign(response, {
        status: 200,
        message: "SUCCESS",
        data: {
          data: new PropertyTransformer(properties, true),
          paginate: {
            page: parseInt(properties.page),
            limit: parseInt(properties.limit),
            totalPages: properties.totalPages,
            count: properties.count,
          },
        },
      });
    }
    res.status(response.status).json(response);
  },
};
