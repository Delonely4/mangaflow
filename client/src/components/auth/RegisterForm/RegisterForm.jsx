import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "@/elements/Input/Input";
import Button from "@/elements/Button/Button";
import Checkbox from "@/elements/Checkbox/Checkbox";
import Alert from "@/elements/Alert/Alert";
import PasswordStrength from "@/elements/PasswordStrength/PasswordStrength";
import styles from "./RegisterForm.module.scss";
import { registerUser } from "@/api/authApi";

function RegisterForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!formData.username.trim()) {
      setError("Please enter a username");
      setLoading(false);
      return;
    }

    if (!formData.email.trim()) {
      setError("Please enter your email");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (!formData.agreeToTerms) {
      setError("You must agree to the terms");
      setLoading(false);
      return;
    }

    try {
      await registerUser(formData.username, formData.email, formData.password);

      setSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field) => (value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === "agreeToTerms" ? !prev.agreeToTerms : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.registerForm}>
      <Alert
        type="success"
        message={
          success ? "Registered successfully! Redirecting to login..." : ""
        }
        className={styles.registerForm__alert}
      />
      <Alert
        type="error"
        message={error}
        className={styles.registerForm__alert}
      />

      <div className={styles.registerForm__fields}>
        <Input
          label="Username"
          type="text"
          value={formData.username}
          onChange={(e) => handleInputChange("username")(e.target.value)}
          placeholder="Choose a username"
          required
          autoComplete="username"
        />

        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange("email")(e.target.value)}
          placeholder="Enter your email"
          required
          autoComplete="email"
        />

        <div className={styles.registerForm__passwordGroup}>
          <Input
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => handleInputChange("password")(e.target.value)}
            placeholder="Create a password"
            required
            autoComplete="new-password"
          />
          <PasswordStrength password={formData.password} />
        </div>

        <Input
          label="Confirm Password"
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => handleInputChange("confirmPassword")(e.target.value)}
          placeholder="Re-enter your password"
          required
          autoComplete="new-password"
        />
      </div>

      <Checkbox
        checked={formData.agreeToTerms}
        onChange={() =>
          handleInputChange("agreeToTerms")(!formData.agreeToTerms)
        }
        className={styles.registerForm__checkbox}
      >
        I agree to the{" "}
        <button type="button" className={styles.registerForm__termsLink}>
          Terms of Service
        </button>
      </Checkbox>

      <Button
        type="submit"
        variant="primary"
        size="large"
        loading={loading}
        className={styles.registerForm__submit}
      >
        {loading ? "Creating Account..." : "Create Account"}
      </Button>
    </form>
  );
}

export default RegisterForm;
