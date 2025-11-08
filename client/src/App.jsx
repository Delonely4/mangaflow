import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import "./App.css";
import CreateManga from "./pages/createManga.jsx";

function App() {
  return (
    <div className="App">
      {/* <nav>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav> */}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/manga/create" element={<CreateManga />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
