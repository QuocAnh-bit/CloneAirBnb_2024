const jwt = require("jsonwebtoken");
const { User, Blacklist } = require("../models/index");
module.exports = async (req, res, next) => {
  const bearer = req.get("Authorization");
  console.log(bearer);
  const response = {};
  if (bearer) {
    const token = bearer.replace("Bearer", "").trim();
    const { JWT_SECRET } = process.env;
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      console.log(decoded);
      const blacklist = await Blacklist.findOne({
        where: {
          token,
        },
      });
      if (blacklist) {
        throw new Error("Token blacklist");
      }
      const { id } = decoded;
      console.log(id);
      const user = await User.findOne(
        {
          attributes: {
            exclude: ["password", "refresh_token", "provider_id"],
          },
        },
        {
          where: { id },
        }
      );
      console.log(user.id, "oer day");

      if (!user) {
        console.log("khoong ton tai");
        throw new Error("User Not Found");
      }
      req.user = user;
      return next();
    } catch (e) {
      console.log(e);
      if (e.message == "jwt expired") {
        Object.assign(response, {
          status: 401,
          message: "Invalid Token",
        });
      } else {
        Object.assign(response, {
          status: 400,
          message: "Bad Request",
        });
      }
    }
  } else {
    console.log("Khoong cos br");
    Object.assign(response, {
      status: 401,
      message: "Unauthorized",
    });
  }
  return res.status(response.status).json(response);
};
