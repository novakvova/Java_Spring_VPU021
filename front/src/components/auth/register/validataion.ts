import * as yup from "yup";

export const RegisterSchema = yup.object({
    email: yup
        .string()
        .required("Поле пошта є обов'язковим!")
        .email("Вкажіть приавльно пошту"),
    password: yup.string()
        .required('Вкажіть пароль.')
        .min(5, 'Пароль має містить мінімум 5 символів.')
        .matches(/[a-zA-Z0-9]/, 'Пароль має містить латинські символи.'),
    confirmPassword: yup.string().required("Поле пошта є обов'язковим!"),
    fullName: yup.string().required("Поле пошта є обов'язковим!"),
});