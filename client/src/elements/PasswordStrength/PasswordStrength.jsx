import styles from "./PasswordStrength.module.scss";

function PasswordStrength({ password }) {
  const calculateStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 6) strength++;
    if (pass.length >= 10) strength++;
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) strength++;
    if (/[0-9]/.test(pass)) strength++;
    if (/[^a-zA-Z0-9]/.test(pass)) strength++;
    return Math.min(strength, 4);
  };

  const getStrengthColor = (strength) => {
    const colors = ["#dc3545", "#fd7e14", "#ffc107", "#20c997", "#198754"];
    return colors[strength];
  };

  const getStrengthText = (strength) => {
    const texts = ["Very Weak", "Weak", "Fair", "Strong", "Very Strong"];
    return texts[strength];
  };

  if (!password) return null;

  const strength = calculateStrength(password);

  return (
    <div className={styles.passwordStrength}>
      <div className={styles.passwordStrength__container}>
        <div className={styles.passwordStrength__bar}>
          <div
            className={styles.passwordStrength__fill}
            style={{
              width: `${(strength / 4) * 100}%`,
              backgroundColor: getStrengthColor(strength),
            }}
          />
        </div>
        <span
          className={styles.passwordStrength__text}
          style={{
            color: getStrengthColor(strength),
          }}
        >
          {getStrengthText(strength)}
        </span>
      </div>
    </div>
  );
}

export default PasswordStrength;
