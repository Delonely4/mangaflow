import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/api";
import Alert from "../pageComponents/common/Alert.jsx";
import AuthFooter from "../pageComponents/common/AuthFooter.jsx";
import FormInput from "../pageComponents/common/FormInput";
import AuthBackground from "../pageComponents/common/AuthBackground.jsx";
import AuthLogo from "../pageComponents/common/AuthLogo.jsx";
import SocialLoginButtons from "../pageComponents/common/SocialLoginButtons.jsx";
import Checkbox from "../pageComponents/common/Checkbox.jsx";
import PasswordStrength from "../pageComponents/common/PasswordStrength.jsx";
import SideImage from "../pageComponents/common/SideImage.jsx";
import "../styles/Auth.css";
import axiosInstance from "../config/axios.js";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!username.trim()) {
      setError("Please enter a username");
      setLoading(false);
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (!agreeToTerms) {
      setError("You must agree to the terms");
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.post("/auth/register", {
        username,
        email,
        password,
      });

      setSuccess(true);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.response?.data?.message || "Registration error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <AuthBackground />

      <div className="auth-content-wrapper">
        <SideImage />

        <div className="auth-container">
          <AuthLogo subtitle="Join The MangaFlow" />

          <div className="auth-card">
            <h2>Create Account</h2>

            <Alert
              type="success"
              message={
                success
                  ? "Registered successfully! Redirecting to login..."
                  : ""
              }
            />
            <Alert type="error" message={error} />

            <form onSubmit={handleSubmit} className="auth-form">
              <FormInput
                label="Username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Choose a username"
                required
              />

              <FormInput
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />

              <div className="auth-form-group">
                <FormInput
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  required
                />
                <PasswordStrength password={password} />
              </div>

              <FormInput
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
                required
              />

              <Checkbox
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
              >
                I agree to the{" "}
                <button type="button" className="auth-link">
                  Terms of Service
                </button>
              </Checkbox>

              <button type="submit" className="auth-submit-btn">
                Create Account
              </button>
            </form>
            <SocialLoginButtons />
          </div>

          <AuthFooter type="register" />
        </div>
      </div>
    </div>
  );
}

export default Register;
