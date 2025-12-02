import styles from "./AuthLayout.module.scss";
import maskImage from "@/assets/mask.jpeg";

function AuthLayout({ children }) {
  return (
    <div className={styles.authLayout}>
      <div className={styles.authLayout__content}>
        <div className={styles.authLayout__side}>
          <img
            src={maskImage}
            alt="Manga Art"
            className={styles.authLayout__sideImage}
          />
          <div className={styles.authLayout__sideOverlay}></div>
        </div>

        <div className={styles.authLayout__main}>{children}</div>
      </div>
    </div>
  );
}

export default AuthLayout;
