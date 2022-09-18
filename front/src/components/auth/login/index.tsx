import {
    ErrorMessage,
    Form,
    FormikHelpers,
    FormikProvider,
    useFormik,
  } from "formik";
  import { useState } from "react";
  import { Link, useNavigate } from "react-router-dom";
  import { useActions } from "../../../hooks/useActions";
  import EclipseWidget from "../../common/eclipse";
  import InputComponent from "../../common/InputComponent";
  import { ILogin, ILoginError } from "./types";
  import { LoginSchema } from "./validation";
  
  const LoginPage: React.FC = () => {
    const initialValues: ILogin = { email: "", password: "", invalid: "" };
    const [loading, setLoading] = useState<boolean>(false);
  
    const { LoginUser } = useActions();
    const navigator = useNavigate();
  
    const onHandleSubmit = async (
      values: ILogin,
      { setFieldError }: FormikHelpers<ILogin>
    ) => { try {
      setLoading(true);
      await LoginUser(values);
      await navigator("/");
      setLoading(false);
    } catch (errors) {
      setLoading(false);
      const serverErrors = errors as ILoginError;
      const { password, invalid } = serverErrors;
      console.log("passwword", password);
      console.log("invalid", invalid);
  
      if (password !== undefined) {
        setFieldError("password", password[0]);
      }
      console.log(invalid.length);
      
      if (invalid !== undefined){
        setFieldError("invalid", invalid[0]);
      }
    }};
  
    const formik = useFormik({
      initialValues: initialValues,
      validationSchema: LoginSchema,
      onSubmit: onHandleSubmit,
    });
    const { errors, touched, handleChange, handleSubmit } = formik;
  
    return (
      <>
        <title>Вхід</title>
        <div className="row">
          <div className="col-3"></div>
          <div className="col-6">
            <h1 className="text-center mt-4">Вхід</h1>
            <FormikProvider value={formik}>
              <Form onSubmit={handleSubmit}>
                {errors.invalid !== undefined && (
                  <div className="alert alert-danger text-center" role="alert">
                    <ErrorMessage name="invalid" />
                  </div>
                )}
  
                <InputComponent
                  title="Email"
                  inputName="email"
                  errors={errors.email}
                  touched={touched.email}
                  handleChange={handleChange}
                />
  
                <InputComponent
                  title="Пароль"
                  inputName="password"
                  errors={errors.password}
                  touched={touched.password}
                  handleChange={handleChange}
                />
                <div className="d-flex justify-content-between">
                  <Link to="/recoverPassword">Забув пароль?</Link>
                  <Link to="/register">Зареєструватися</Link>
                </div>
  
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-secondary px-5"
                    disabled={loading}
                  >
                    Вхід
                  </button>
                </div>
              </Form>
            </FormikProvider>
          </div>
          <div className="col-3"></div>
        </div>
        {loading && <EclipseWidget />}
      </>
    );
  };
  export default LoginPage;