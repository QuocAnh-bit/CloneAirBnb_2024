const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const salt = bcrypt.genSaltSync(saltRounds);
const { Provider, User, Blacklist } = require("../models/index");

const hashPass = (password) => {
  const hashPassWord = bcrypt.hashSync(password, salt);
  return hashPassWord;
};
const { JWT_SECRET, JWT_EXPIRE, JWT_REFRESH_EXPIRE } = process.env;

module.exports = {
  userRegister: async (infoRegister) => {
    try {
      const { username, email, password } = infoRegister;
      const hashPassWord = hashPass(password);
      const [provider, created] = await Provider.findOrCreate({
        where: { provider_name: "email" },
        defaults: {
          provider_name: "email",
        },
      });
      if (created) {
        console.log(provider.id);
      }
      await User.create({
        username,
        email: email.toLowerCase(),
        password: hashPassWord,
        provider_id: provider.id,
        // Provider: {
        //   name: "email",
        // },
        // include: [Provider],
      });
    } catch (error) {
      console.log(error, "Register");
    }
  },
  userLogin: async (infoLogin) => {
    const { email, password: userPassword } = infoLogin;
    try {
      const provider = await Provider.findOne({
        where: { provider_name: "email" },
      });
      const user = await User.findOne({
        where: { email: email.toLowerCase(), provider_id: provider.id },
      });
      console.log(user, "user");
      if (!user) {
        return false;
      } else {
        const result = await bcrypt.compare(userPassword, user.password);
        if (result) {
          const token = jwt.sign({ id: user.id }, JWT_SECRET, {
            expiresIn: JWT_EXPIRE,
          });
          const refresh = jwt.sign(
            {
              data: new Date().getTime() + Math.random(),
            },
            JWT_SECRET,
            {
              expiresIn: JWT_REFRESH_EXPIRE,
            }
          );
          await User.update(
            {
              refresh_token: refresh,
            },
            {
              where: { id: user.id },
            }
          );

          delete user.password;
          delete user.provider_id;
          delete user.access_token;
          delete user.refresh_token;
          return {
            ...user.dataValues,
            access_token: token,
            refresh_token: refresh,
          };
        } else {
          return false;
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
  refreshToken: async (refreshToken) => {
    if (!refreshToken) return false;
    try {
      jwt.verify(refreshToken, JWT_SECRET);
      const user = await User.findOne({
        where: { refresh_token: refreshToken },
      });
      if (!user) return false;
      const accessToken = jwt.sign({ id: user.id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRE,
      });

      return { accessToken, refreshToken };
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  authGoogle: async (id) => {
    const provider = await Provider.findOne({
      where: { provider_name: "google" },
    });
    const user = await User.findOne(
      {
        attributes: {
          exclude: ["password", "refresh_token", "provider_id"],
        },
      },
      {
        where: { id, provider_id: provider.id },
      }
    );
    const token = jwt.sign({ id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRE,
    });

    const refresh = jwt.sign(
      {
        data: new Date().getTime() + Math.random(),
      },
      JWT_SECRET,
      {
        expiresIn: JWT_REFRESH_EXPIRE,
      }
    );
    await User.update(
      {
        refresh_token: refresh,
      },
      {
        where: { id },
      }
    );
    return { user, access_token: token, refresh_token: refresh };
  },
  logout: async (access_token) => {
    try {
      await Blacklist.findOrCreate({
        where: {
          token: access_token,
        },
        defaults: { token: access_token },
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};
