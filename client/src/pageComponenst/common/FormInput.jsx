function FormInput({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
}) {
  return (
    <div className="auth-form-group">
      <label htmlFor={label.toLowerCase()} className="auth-label">
        {label}
      </label>
      <input
        type={type}
        id={label.toLowerCase()}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="auth-input"
      />
    </div>
  );
}

export default FormInput;
