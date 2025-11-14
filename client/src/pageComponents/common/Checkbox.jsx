function CheckBox({ checked, onChange, label, children }) {
  return (
    <label className="auth-checkbox-label">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="auth-checkbox"
      />
      <span>{children || label}</span>
    </label>
  );
}

export default CheckBox;
