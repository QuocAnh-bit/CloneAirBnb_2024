const GoogleStrategy = require("passport-google-oauth2").Strategy;
const { User, Provider } = require("../models/index");
const { Op } = require("sequelize");

module.exports = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.URL_CLIENT + "/api/auth/callback",
    passReqToCallback: true,
  },
  async (request, accessToken, refreshToken, profile, cb) => {
    //logic lấy thông tin user từ db
    console.log(process.env.GOOGLE_CLIENT_ID);
    console.log(profile);
    const [provider, created] = await Provider.findOrCreate({
      where: { provider_name: profile.provider },
      defaults: {
        provider_name: profile.provider,
      },
    });

    const [user, createUser] = await User.findOrCreate({
      where: {
        [Op.and]: [
          { email: profile.emails[0].value },
          { provider_id: provider.id },
        ],
      },
      defaults: {
        username: profile.displayName,
        password: null,
        email: profile.emails[0].value,
        provider_id: provider.id,
        avatar: profile.photos[0].value,
      },
    });

    cb(null, user);
  }
);
