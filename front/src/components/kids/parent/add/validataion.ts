import * as yup from "yup";

export const ParentAddSchema = yup.object({
  firstName: yup
    .string()
    .required("Поле пошта є обов'язковим!")
});