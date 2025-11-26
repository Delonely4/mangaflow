import styles from "@/pageComponents/auth/SocialLogin.module.scss";

function SocialLogin() {
  return (
    <div className={styles.socialLogin}>
      <button type="button" className={styles.socialLogin__btn}>
        Continue with Google
      </button>
      <button type="button" className={styles.socialLogin__btn}>
        Continue with GitHub
      </button>
    </div>
  );
}

export default SocialLogin;
