import styles from "./Checkbox.module.scss";

function Checkbox({ checked, onChange, label, children, className = "" }) {
  return (
    <label className={`${styles.checkbox} ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={styles.checkbox__input}
      />
      <span className={styles.checkbox__checkmark}></span>
      <span className={styles.checkbox__label}>{children || label}</span>
    </label>
  );
}

export default Checkbox;
