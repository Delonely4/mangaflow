function Alert({ type, message }) {
  if (!message) return null;

  return <div className={`auth-alert auth-alert-${type}`}>{message}</div>;
}

export default Alert;
