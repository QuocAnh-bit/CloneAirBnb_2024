import * as yup from "yup";
export const validateAuth = (statusForm) => {
  let schema;
  if (statusForm) {
    schema = yup.object({
      email: yup
        .string()
        .required("Email bắt buộc phải nhập")
        .email("Email không đúng định dạng"),
      password: yup
        .string()
        .required("Mật khẩu bắt buộc phải nhập")
        .min(8, "Mật khẩu phải trên 8 ký tự"),
    });
  } else {
    schema = yup.object({
      username: yup.string().required("Tên bắt buộc phải nhập"),
      email: yup
        .string()
        .required("Email bắt buộc phải nhập")
        .email("Email không đúng định dạng"),
      password: yup
        .string()
        .required("Mật khẩu bắt buộc phải nhập")
        .min(8, "Mật khẩu phải trên 8 ký tự"),
    });
  }

  return schema;
};
