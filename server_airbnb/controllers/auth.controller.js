const { object, string, ref } = require("yup");
const authService = require("../service/authService");
const uniqueService = require("../service/uniqueService");
const jwt = require("jsonwebtoken");
const AuthTransformer = require("../transformers/auth.transformer");

module.exports = {
  index: async (req, res) => {
    const response = {};
    const schema = object({
      email: string()
        .required("Email bắt buộc phải nhập")
        .email("Email không đúng định dạng"),
      password: string()
        .required("Mật khẩu bắt buộc phải nhập")
        .min(8, "Mật khẩu phải trên 8 ký tự"),
    });
    try {
      const body = await schema.validate(req.body, { abortEarly: false });
      const checkLogin = await authService.userLogin(body);
      console.log(checkLogin, "checkLoginsssss");
      if (!checkLogin) {
        Object.assign(response, {
          status: 400,
          message: "Bad request",
          error: "Email hoặc mật khẩu không đúng",
        });
      } else {
        Object.assign(response, {
          status: 200,
          message: "Đăng nhập thành công",
          data: new AuthTransformer(checkLogin),
        });
      }
    } catch (e) {
      const err = Object.fromEntries(
        e?.inner.map((item) => [item.path, item.message])
      );
      console.log(err);
      Object.assign(response, {
        status: 400,
        error: err,
      });
    }
    res.status(response.status).json(response);
  },
  register: async (req, res) => {
    const response = {};
    const schema = object({
      username: string().required("Tên bắt buộc phải nhập"),
      email: string()
        .required("Email bắt buộc phải nhập")
        .email("Email không đúng định dạng")
        .test("unique", "Email đã tồn tại trên hệ thống", async (value) => {
          return await uniqueService.checkEmailUnique(value);
        }),
      password: string()
        .required("Mật khẩu bắt buộc phải nhập")
        .min(8, "Mật khẩu phải trên 8 ký tự"),
    });
    try {
      const body = await schema.validate(req.body, { abortEarly: false });
      await authService.userRegister(body);
      Object.assign(response, {
        status: 200,
        message: "Đăng ký thành công",
      });
    } catch (e) {
      console.log(e);
      const err = Object.fromEntries(
        e?.inner.map((item) => [item.path, item.message])
      );
      Object.assign(response, {
        status: 400,
        error: err,
      });
    }
    res.status(response.status).json(response);
  },
  refresh: async (req, res) => {
    const { refresh_token } = req.body;

    const response = {};
    try {
      const reNewToken = await authService.refreshToken(refresh_token);
      if (!reNewToken) {
        Object.assign(response, {
          status: 401,
          message: "Unauthorized",
        });
      } else {
        Object.assign(response, {
          status: 200,
          message: "Success",
          data: reNewToken,
        });
      }
    } catch (e) {
      console.log(e);
      Object.assign(response, {
        status: 401,
        message: "Unauthorized",
      });
    }

    res.status(response.status).json(response);
  },
  loginGoogle: async (req, res) => {
    const { id } = req.user;
    const response = {};
    try {
      const authGoogle = await authService.authGoogle(id);
      if (authGoogle) {
        Object.assign(response, {
          status: 200,
          message: "Success",
          data: authGoogle,
        });
      }
    } catch (error) {
      console.log(error);
      Object.assign(response, {
        status: 401,
        message: "Bad request",
        error: "Unauthorized",
      });
    }

    res.status(response.status).json(response);
  },
  logout: async (req, res) => {
    const { access_token } = req.body;
    const logout = await authService.logout(access_token);
    if (logout) {
      res.json({
        status: 200,
        message: "Success",
      });
    } else {
      res.json({
        status: 400,
        message: "bad request",
      });
    }
  },
};
