import { useNavigate } from "react-router-dom";

function AuthFooter({ type }) {
  const navigate = useNavigate();

  if (type === "login") {
    return (
      <div className="auth-footer">
        Have no account?{" "}
        <button onClick={() => navigate("/register")}>Sign up</button>
      </div>
    );
  }

  return (
    <div className="auth-footer">
      Already have an account?{" "}
      <button onClick={() => navigate("/login")}>Login</button>
    </div>
  );
}

export default AuthFooter;
