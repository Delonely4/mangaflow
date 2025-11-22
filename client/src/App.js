import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Login from "./pages/Login/Login.jsx";
import Register from "../pages/Register/Register";
import MangaLibrary from "../pages/MangaLibrary/MangaLibrary";
import CreateManga from "../pages/CreateManga/CreateManga";
import useAuth from "./hooks/useAuth/useAuth";
import "./styles/global.scss";

function App() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/manga/library" element={<MangaLibrary />} />
          <Route path="/manga/create" element={<CreateManga />} />
          <Route path="/" element={<MangaLibrary />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
