import { Link } from "react-router-dom";

function AuthFooter({ type }) {
  if (type === "login") {
    return (
      <p classname="form-footer" style={{ color: "#333" }}>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    );
  }

  return (
    <p classname="form-footer" style={{ color: "#333" }}>
      Already have an account? <Link to="/login">Log in here</Link>
    </p>
  );
}

export default AuthFooter;
