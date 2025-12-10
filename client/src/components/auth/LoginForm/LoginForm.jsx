import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks";
import Input from "@/elements/Input/Input";
import Button from "@/elements/Button/Button";
import Checkbox from "@/elements/Checkbox/Checkbox";
import Alert from "@/elements/Alert/Alert";
import styles from "./LoginForm.module.scss";
import { loginUser } from "@/api/authApi";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!formData.email.trim()) {
      setError("Please enter your email");
      setLoading(false);
      return;
    }

    if (!formData.password.trim()) {
      setError("Please enter your password");
      setLoading(false);
      return;
    }

    try {
      const data = await loginUser(formData.email, formData.password);
      login(data.token);
      setSuccess("Login successful!");
      setTimeout(() => {
        navigate("/manga/library");
      }, 1500);
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field) => (value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === "rememberMe" ? !prev.rememberMe : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className={styles.loginForm}>
      <Alert type="error" message={error} className={styles.loginForm__alert} />

      <div className={styles.loginForm__fields}>
        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange("email")(e.target.value)}
          placeholder="Enter your email"
          required
          autoComplete="email"
        />

        <Input
          label="Password"
          type="password"
          value={formData.password}
          onChange={(e) => handleInputChange("password")(e.target.value)}
          placeholder="Enter your password"
          required
          autoComplete="current-password"
        />
      </div>

      <div className={styles.loginForm__options}>
        <Checkbox
          checked={formData.rememberMe}
          onChange={() => handleInputChange("rememberMe")(!formData.rememberMe)}
          label="Remember me"
        />

        <button type="button" className={styles.loginForm__forgotPassword}>
          Forgot password?
        </button>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="large"
        loading={loading}
        className={styles.loginForm__submit}
      >
        {loading ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
}

export default LoginForm;
