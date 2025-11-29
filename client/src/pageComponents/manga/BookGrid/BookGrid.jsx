import styles from "./BookGrid.module.scss";

function BookGrid({ children }) {
  return <div className={styles.bookGrid}>{children}</div>;
}

export default BookGrid;
