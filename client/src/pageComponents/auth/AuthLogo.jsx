import styles from "./AuthLogo.module.scss";

function AuthLogo({ subtitle }) {
  return (
    <div className={styles.authLogo}>
      <h1 className={styles.authLogo__title}>Manga Flow</h1>
      <p className={styles.authLogo__subtitle}>{subtitle}</p>
    </div>
  );
}

export default AuthLogo;
