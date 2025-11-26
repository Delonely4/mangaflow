import { Link } from "react-router-dom";
import { useAuth } from "@/hooks";
import Button from "@/elements/Button/Button";
import styles from "./Header.module.scss";

function Header() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__logo}>
          <Link to="/" className={styles.header__logoLink}>
            MangaFlow
          </Link>
        </div>

        <nav className={styles.header__nav}>
          <Link to="/manga/library" className={styles.header__navLink}>
            Library
          </Link>

          {isAuthenticated ? (
            <div className={styles.header__userSection}>
              <span className={styles.header__userName}>
                Hello, {user?.username}
              </span>
              <Button
                variant="outline"
                size="small"
                onClick={logout}
                className={styles.header__logoutBtn}
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className={styles.header__authSection}>
              <Link to="/login" className={styles.header__navLink}>
                Login
              </Link>
              <Link to="/register">
                <Button variant="primary" size="small">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
