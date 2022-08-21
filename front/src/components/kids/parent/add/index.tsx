import { useState } from "react";
import { Form, FormikProvider, useFormik } from "formik";
import InputComponent from "../../../common/InputComponent";
import { ParentAddSchema } from "./validataion";
import { IParentAdd } from "./types";
import CropperDialog from "../../../common/CropperDialog";
import http from "../../../../http_common";
import { useNavigate } from "react-router-dom";

const ParentAddPage: React.FC = () => {
  const initialValues: IParentAdd = {
    firstName: "",
    lastName: "",
    phone: "",
    imageBase64: "",
    adress: "",
  };

  const navigate = useNavigate();
  const [message, setMessage] = useState<string>();

  const onHandleSubmit = async (values: IParentAdd) => {

      console.log(values);
      await http
        .post<IParentAdd>("/create", values)
        .then((response) => {
          console.log("response "+ response);
          navigate("/parent");
        })
        .catch((error) => {
          setMessage(error.message);
        });
    
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: onHandleSubmit,
    validationSchema: ParentAddSchema,
  });
    //Деструктуризація
    const { errors, touched, handleSubmit, handleChange, setFieldValue } = formik;
  return (
    <>
      <div className="row">
      <div className="offset-md-3 col-md-6">
        <h1 className="text-center">Добавити категорію</h1>
        <FormikProvider value={formik}>
          <Form onSubmit={handleSubmit}>

            <InputComponent
              inputName="firstName"
              title="Імя"
              touched={touched.firstName}
              errors={errors.firstName}
              handleChange={handleChange}
            />

            <InputComponent
              inputName="lastName"
              title="Прізвище"
              touched={touched.lastName}
              errors={errors.lastName}
              handleChange={handleChange}
            />

            <InputComponent
              inputName="phone"
              title="Телефон"
              touched={touched.phone}
              errors={errors.phone}
              handleChange={handleChange}
            />

            <InputComponent
              inputName="adress"
              title="Адрес"
              touched={touched.adress}
              errors={errors.adress}
              handleChange={handleChange}
            />

            <CropperDialog
              onChange={setFieldValue}
              field="imageBase64"
              error={errors.imageBase64}
              touched={touched.imageBase64}
            />
            
            <div className="mb-3">
              <button type="submit" className="btn btn-primary">
                Добавити
              </button>
              {message && (
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              )}
            </div>
          </Form>
        </FormikProvider>
      </div>
    </div>
    </>
  );
};

export default ParentAddPage;
