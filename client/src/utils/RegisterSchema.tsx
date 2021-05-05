import * as Yup from "yup";

export const RegistrationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name should atleast be 3 characters!")
    .max(50, "Name cannot be greater than 50 characters!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Password should atleast be 6 characters!")
    .required("Required"),
  category: Yup.string().required("Required"),
  zipcode: Yup.string()
    .min(6, "Please enter a valid zipcode")
    .max(6, "Please enter a valid zipcode")
    .required("Required"),
});
