import styles from "./AuthLayout.module.scss";
import vagabondImage from "@/assets/vagmanga.png";

function AuthLayout({ children }) {
  return (
    <div className={styles.authLayout}>
      <div className={styles.authLayout__background}>
        <svg className={styles.authLayout__inkStroke1} viewBox="0 0 500 500">
          <path
            d="M100,150 Q250,80 350,120 T450,180"
            stroke="var(--color-primary-dark)"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            opacity="0.1"
          />
        </svg>

        <svg className={styles.authLayout__inkStroke2} viewBox="0 0 500 500">
          <path
            d="M50,300 Q150,250 280,280 T400,320"
            stroke="var(--color-primary-dark)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            opacity="0.08"
          />
        </svg>
      </div>

      <div className={styles.authLayout__content}>
        <div className={styles.authLayout__side}>
          <img
            src={vagabondImage}
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
