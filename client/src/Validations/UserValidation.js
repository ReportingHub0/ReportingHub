import * as yup from "yup";
export const userSchemaValidation = yup.object().shape({
  id: yup.string().required("Id is required"),
  name: yup.string().required("User name required"),
  role: yup.string().required("Choose the Role"),
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
    )
    .required("Password required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "password don't match")
    .required("Confirmation Password is required"),
  phoneNumber: yup
    .string()
    .matches(/^\d+$/, "Phone Number must only contains  digits ")
    .length(8, "Phone Number must be constains of 8 digits")
    .required("Phone number is required"),
});
