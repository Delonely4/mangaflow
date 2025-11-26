import styles from "./Button.module.scss";

function Button({
  children,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  type = "button",
  onClick,
  className = "",
  ...props
}) {
  const classNames = [
    styles.button,
    styles[`button--${variant}`],
    styles[`button--${size}`],
    disabled ? styles[`button--disabled`] : "",
    loading ? styles[`button--loading`] : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={classNames}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && <span className={styles.button__spinner}></span>}
      <span className={styles.button__content}>{children}</span>
    </button>
  );
}

export default Button;
