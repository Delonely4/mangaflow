import { Helmet } from "react-helmet-async";
import AuthLayout from "../../../layouts/AuthLayout/AuthLayout";
import LoginForm from "../../../components/auth/LoginForm/LoginForm";
import SocialLogin from "../../../components/auth/SocialLogin/SocialLogin";
import AuthLogo from "../../../pageComponents/auth/AuthLogo/AuthLogo";
import AuthFooter from "../../../pageComponents/auth/AuthFooter/AuthFooter";
import styles from "./Login.module.scss";

function Login() {
  return (
    <>
      <Helmet>
        <title>Login - MangaFlow</title>
        <meta name="description" content="Login to your MangaFlow account" />
      </Helmet>

      <AuthLayout>
        <div className={styles.login}>
          <AuthLogo subtitle="Your Manga Reading Companion" />

          <div className={styles.login__card}>
            <h2 className={styles.login__title}>Login</h2>

            <LoginForm />
            <SocialLogin />
          </div>

          <AuthFooter type="login" />
        </div>
      </AuthLayout>
    </>
  );
}

export default Login;
