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
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
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
          navigate("/manga/library");
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
