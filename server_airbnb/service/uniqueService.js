const { User } = require("../models/index");

const { Op } = require("sequelize");

module.exports = {
  checkEmailUnique: async (email, id = 0) => {
    try {
      const ignore = id > 0 ? { email, id: { [Op.not]: id } } : { email };
      console.log("ignore", ignore);
      const check = await User.findOne({ where: ignore });
      return check === null ? true : false;
    } catch (error) {
      console.log(error);
    }
  },
};
