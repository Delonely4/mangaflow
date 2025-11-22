import styles from "./Input.module.scss";

function Input({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  error,
  className = "",
  ...props
}) {
  const inputId = label ? label.toLowerCase().replace(/\s+/g, "-") : undefined;

  return (
    <div className={`${styles.inputGroup} ${className}`}>
      {label && (
        <label htmlFor={inputId} className={styles.inputGroup__label}>
          {label}
          {required && <span className={styles.inputGroup__required}>*</span>}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`${styles.inputGroup__input} ${
          error ? styles["inputGroup__input--error"] : ""
        }`}
        {...props}
      />
      {error && <span className={styles.inputGroup__error}>{error}</span>}
    </div>
  );
}

export default Input;
