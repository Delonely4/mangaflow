import { Helmet } from "react-helmet-async";
import AuthLayout from "@/layouts/AuthLayout/AuthLayout";
import LoginForm from "@/components/auth/LoginForm/LoginForm";
import { SocialLogin, AuthLogo, AuthFooter } from "@/pageComponents";
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
