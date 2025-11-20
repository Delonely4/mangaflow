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
import SideImage from "../pageComponents/common/SideImage.jsx";
import useAuth from "../hooks/useAuth.js";
import "../styles/Auth.css";
import axiosInstance from "../config/axios.js";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email.trim()) {
      setError("Please enter your email");
      setLoading(false);
      return;
    }
    if (!password.trim()) {
      setError("Please enter your password");
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      if (response.data.token) {
        login(response.data.token);
      }

      setSuccess(true);

      setTimeout(() => {
        navigate("/manga/library");
      }, 1500);
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.message || "Unable to connect to the server"
      );
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
          <AuthLogo subtitle="Your Manga Reading Companion" />

          <div className="auth-card">
            <h2>Login</h2>

            <Alert
              type="success"
              message={success ? "Logged in successfully!" : ""}
            />
            <Alert type="error" message={error} />

            <form onSubmit={handleSubmit} className="auth-form">
              <FormInput
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />

              <FormInput
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />

              <div className="auth-options">
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  label="Remember me"
                />
                <button type="button" className="auth-link">
                  Forgot password?
                </button>
              </div>

              <button type="submit" className="auth-submit-btn">
                Log in
              </button>
            </form>

            <SocialLoginButtons />
          </div>

          <AuthFooter type="login" />
        </div>
      </div>
    </div>
  );
}

export default Login;
