import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Login from "@/pages/Login/Login";
import Register from "@/pages/Register/Register";
import MangaLibrary from "@/pages/MangaLibrary/MangaLibrary";
import CreateManga from "@/pages/CreateManga/CreateManga";
import Profile from "@/pages/Profile/Profile";
import useAuth from "@/hooks/useAuth";
import "@/styles/global.module.scss";

function App() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <HelmetProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/manga/library" element={<MangaLibrary />} />
        <Route path="/manga/create" element={<CreateManga />} />
        <Route path="/" element={<MangaLibrary />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </HelmetProvider>
  );
}

export default App;
