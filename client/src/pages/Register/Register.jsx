import { Helmet } from "react-helmet-async";
import AuthLayout from "../../../layouts/AuthLayout/AuthLayout";
import RegisterForm from "../../../components/auth/RegisterForm/RegisterForm";
import SocialLogin from "../../../components/auth/SocialLogin/SocialLogin";
import AuthLogo from "../../../pageComponents/auth/AuthLogo/AuthLogo";
import AuthFooter from "../../../pageComponents/auth/AuthFooter/AuthFooter";
import styles from "./Register.module.scss";

function Register() {
  return (
    <>
      <Helmet>
        <title>Register - MangaFlow</title>
        <meta name="description" content="Create your MangaFlow account" />
      </Helmet>

      <AuthLayout>
        <div className={styles.register}>
          <AuthLogo subtitle="Join The MangaFlow" />

          <div className={styles.register__card}>
            <h2 className={styles.register__title}>Create Account</h2>

            <RegisterForm />
            <SocialLogin />
          </div>

          <AuthFooter type="register" />
        </div>
      </AuthLayout>
    </>
  );
}

export default Register;
