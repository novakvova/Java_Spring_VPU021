import RegisterPage from "./registerPage";
import {GoogleReCaptchaProvider} from 'react-google-recaptcha-v3';

const Register = () => {
  return (
    <>
      <GoogleReCaptchaProvider reCaptchaKey="6LcDNgsiAAAAAPWbiOhCx0LyEuVMSwBpDHI0RPJh">
        <RegisterPage />
      </GoogleReCaptchaProvider>
    </>
  );
};

export default Register;
