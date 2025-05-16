import * as yup from "yup";

export const staffSchemaValidation = yup.object().shape({
  id: yup.string().required("Technical Id is required"),
  name: yup.string().required("Technical name required"),
  email: yup.string().email("Not email format").required("Email required"),
  password: yup
    .string()
    .min(8)
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*]/,
      "Password must contain at least one special character"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "password don't match"),
  role: yup.string().required("choose the Role"),
  phoneNumber: yup
    .string()
    .matches(/^\d+$/, "Phone Number must only contains  digits ")
    .length(8, "Phone Number must be constains of 8 digits")
    .required("Phone number is required"),
  building: yup.string().required("Choose the Building"),
});
