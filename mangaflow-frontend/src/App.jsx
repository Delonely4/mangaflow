import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { MangaList } from "./pages/MangaList";
import { MangaDetail } from "./pages/MangaDetail";
import { AddManga } from "./pages/AddManga";
import "./App.css";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/manga" element={<MangaList />} />
        <Route path="/manga/:id" element={<MangaDetail />} />
        <Route path="/manga/add" element={<AddManga />} />
      </Routes>
    </Layout>
  );
}

export default App;
