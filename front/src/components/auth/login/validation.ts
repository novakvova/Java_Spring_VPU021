import * as Yup from "yup";

export const LoginSchema = Yup.object({
  email: Yup.string()
    .email("Не коректно вказана пошта")
    .required("Вкажіть пошту"),

   password: Yup.string()
      .required('Вкажіть пароль.')
      .min(5, 'Пароль має містить мінімум 5 символів.')
      .matches(/[a-zA-Z0-9]/, 'Пароль має містить латинські символи.'),
    invalid: Yup.string()
});