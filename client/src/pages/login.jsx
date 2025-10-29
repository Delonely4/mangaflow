import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../pageComponenst/common/Alert.jsx";
import AuthFooter from "../pageComponenst/common/AuthFooter.jsx";
import FormInput from "../pageComponenst/common/FormInput";
import { API_BASE_URL } from "../config/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    <div className="page-container">
      <div className="form-card">
        <h1 style={{ marginTop: 0, marginBottom: "30px", color: "#333" }}>
          Login
        </h1>

        <Alert
          type="success"
          message={success ? "Logged in successfully!" : ""}
        />
        <Alert type="error" message={error} />

        <form onSubmit={handleSubmit}>
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

          <button type="submit" className="btn btn-primary">
            Log in
          </button>
        </form>

        <AuthFooter type="login" />
      </div>
    </div>
  );
}

export default Login;
