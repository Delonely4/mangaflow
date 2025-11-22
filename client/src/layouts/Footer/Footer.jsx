import { Link } from "react-router-dom";
import styles from "./Footer.module.scss";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__content}>
          <div className={styles.footer__brand}>
            <h3 className={styles.footer__logo}>MangaFlow</h3>
            <p className={styles.footer__tagline}>
              Your manga reading companion
            </p>
          </div>

          <div className={styles.footer__links}>
            <div className={styles.footer__linkGroup}>
              <h4 className={styles.footer__linkTitle}>Explore</h4>
              <Link to="/manga/library" className={styles.footer__link}>
                Library
              </Link>
              <Link to="/manga/create" className={styles.footer__link}>
                Add Manga
              </Link>
            </div>

            <div className={styles.footer__linkGroup}>
              <h4 className={styles.footer__linkTitle}>Account</h4>
              <Link to="/login" className={styles.footer__link}>
                Login
              </Link>
              <Link to="/register" className={styles.footer__link}>
                Register
              </Link>
            </div>

            <div className={styles.footer__linkGroup}>
              <h4 className={styles.footer__linkTitle}>Support</h4>
              <a href="/help" className={styles.footer__link}>
                Help Center
              </a>
              <a href="/contact" className={styles.footer__link}>
                Contact Us
              </a>
            </div>
          </div>
        </div>

        <div className={styles.footer__bottom}>
          <p className={styles.footer__copyright}>
            &copy; {currentYear} MangaFlow. All rights reserved.
          </p>
          <div className={styles.footer__legal}>
            <a href="/privacy" className={styles.footer__legalLink}>
              Privacy Policy
            </a>
            <a href="/terms" className={styles.footer__legalLink}>
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
