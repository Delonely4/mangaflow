import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../pageComponenst/common/Alert.jsx";
import AuthFooter from "../pageComponenst/common/AuthFooter.jsx";
import FormInput from "../pageComponenst/common/FormInput";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError(data.message || "Registration error");
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
          Register
        </h1>

        <Alert
          type="success"
          message={
            success ? "Registered successfully! Redirecting to login..." : ""
          }
        />
        <Alert type="error" message={error} />

        <form onSubmit={handleSubmit} noValidate>
          <FormInput
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Choose a username"
          />

          <FormInput
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />

          <FormInput
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
          />

          <FormInput
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter your password"
            required
          />

          <button type="submit" className="btn btn-primary">
            Create Account
          </button>
        </form>

        <AuthFooter type="register" />
      </div>
    </div>
  );
}

export default Register;
