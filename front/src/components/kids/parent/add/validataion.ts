import * as yup from "yup";

export const ParentAddSchema = yup.object({
  firstName: yup.string().required("Поле пошта є обов'язковим!"),
  lastName: yup.string().required("Поле пошта є обов'язковим!"),
  phone: yup.string().required("Поле пошта є обов'язковим!"),
  imageBase64: yup.string().required("Оберіть фото (для вибору фото натисніть на зображення)!"),
  adress: yup.string().required("Поле пошта є обов'язковим!"),
});