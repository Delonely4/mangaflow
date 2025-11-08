import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config/api.js";
import Alert from "../pageComponenst/common/Alert.jsx";
import AuthFooter from "../pageComponenst/common/AuthFooter.jsx";
import FormInput from "../pageComponenst/common/FormInput";
import AuthBackground from "../pageComponenst/common/AuthBackground.jsx";
import AuthLogo from "../pageComponenst/common/AuthLogo.jsx";
import SocialLoginButtons from "../pageComponenst/common/SocialLoginButtons.jsx";
import Checkbox from "../pageComponenst/common/Checkbox.jsx";
import "../styles/Auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }
    if (!password.trim()) {
      setError("Please enter your password");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        setSuccess(true);

        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        setError(data.message || "Wrong email or password");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Unable to connect to the server");
    }
  };

  return (
    <div className="auth-page">
      <AuthBackground />

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
                onChange={(e) => setRememberMe(e.target.value)}
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
  );
}

export default Login;
