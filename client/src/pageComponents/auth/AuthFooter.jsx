import { Link } from "react-router-dom";
import styles from "./AuthFooter.module.scss";

function AuthFooter({ type = "login" }) {
  return (
    <div className={styles.authFooter}>
      {type === "login" ? (
        <p className={styles.authFooter__text}>
          Don't have an account?{" "}
          <Link to="/register" className={styles.authFooter__link}>
            Sign up
          </Link>
        </p>
      ) : (
        <p className={styles.authFooter__text}>
          Already have an account?{" "}
          <Link to="/login" className={styles.authFooter__link}>
            Sign in
          </Link>
        </p>
      )}
    </div>
  );
}

export default AuthFooter;
