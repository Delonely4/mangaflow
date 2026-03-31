import styles from "./SocialLogin.module.scss";

function SocialLogin() {
  return (
    <div className={styles.socialDivider}>
      <button type="button" className={styles.socialButtons__button}>
        Continue with Google
      </button>
    </div>
  );
}

export default SocialLogin;
