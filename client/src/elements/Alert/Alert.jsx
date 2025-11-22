import styles from "./Alert.module.scss";

function Alert({ type = "info", message, className = "" }) {
  if (!message) return null;

  return (
    <div className={`${styles.alert} ${styles[`alert--${type}`]} ${className}`}>
      {message}
    </div>
  );
}

export default Alert;
