function LogoutButton() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: "8px 16px",
        background: "transparent",
        border: "1px solid #212529",
        color: "#212529",
        borderRadius: "8px",
        cursor: "pointer",
        marginLeft: "10px",
      }}
    >
      Logout
    </button>
  );
}

export default LogoutButton;
