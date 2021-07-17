import * as Yup from "yup";

export const UnsubscribeSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});
