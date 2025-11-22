import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styles from "./MainLayout.module.scss";

function MainLayout({ children }) {
  return (
    <div className={styles.mainLayout}>
      <Header />
      <main className={styles.mainLayout__content}>
        <div className={styles.mainLayout__container}>{children}</div>
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
