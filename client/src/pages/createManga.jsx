import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../pageComponents/common/Alert.jsx";
import AuthBackground from "../pageComponents/common/AuthBackground.jsx";
import AuthLogo from "../pageComponents/common/AuthLogo.jsx";
import SideImage from "../pageComponents/common/SideImage.jsx";
import useProtectedRoute from "../hooks/useProtectedRoute.js";
import "../styles/Auth.css";
import axiosInstance from "../config/axios.js";

function CreateManga() {
  const { isLoading } = useProtectedRoute();

  const [formData, setFormData] = useState({
    name: "",
    cover_img: "",
    description: "",
    status: "",
    total_chapters: 0,
    total_chapters_rus: 0,
    total_chapters_eng: 0,
    authors: [],
    genres: [],
    tags: [],
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newGenre, setNewGenre] = useState("");
  const [newTag, setNewTag] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="auth-page">
        <div className="auth-content-wrapper">
          <div className="auth-container">
            <div className="auth-card">
              <h2>Loading...</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseInt(value) || 0,
    }));
  };

  const addAuthor = () => {
    if (newAuthor.trim() && !formData.authors.includes(newAuthor.trim())) {
      setFormData((prev) => ({
        ...prev,
        authors: [...prev.authors, newAuthor.trim()],
      }));
      setNewAuthor("");
    }
  };

  const removeAuthor = (index) => {
    setFormData((prev) => ({
      ...prev,
      authors: prev.authors.filter((_, i) => i !== index),
    }));
  };

  const addGenre = () => {
    if (newGenre.trim() && !formData.genres.includes(newGenre.trim())) {
      setFormData((prev) => ({
        ...prev,
        genres: [...prev.genres, newGenre.trim()],
      }));
      setNewGenre("");
    }
  };

  const removeGenre = (index) => {
    setFormData((prev) => ({
      ...prev,
      genres: prev.genres.filter((_, i) => i !== index),
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const removeTag = (index) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!formData.name.trim()) {
      setError("Book name is required");
      setLoading(false);
      return;
    }

    try {
      await axiosInstance.post("/books", formData);

      setSuccess("Manga created successfully!");
      setFormData({
        name: "",
        cover_img: "",
        description: "",
        status: "",
        total_chapters: 0,
        total_chapters_rus: 0,
        total_chapters_eng: 0,
        authors: [],
        genres: [],
        tags: [],
      });

      setTimeout(() => {
        navigate("/manga/library");
      }, 2000);
    } catch (err) {
      console.error("Create manga error:", err);
      setError(err.response?.data?.message || "Failed to create manga");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <AuthBackground />

      <div className="auth-content-wrapper">
        <SideImage />

        <div className="auth-container">
          <AuthLogo subtitle="Add New Manga to Your Library" />

          <div className="auth-card">
            <h2>Create New Manga</h2>

            <Alert type="success" message={success} />
            <Alert type="error" message={error} />

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="auth-form-group">
                <label className="auth-label">Manga Title *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter manga title"
                  className="auth-input"
                  required
                />
              </div>

              <div className="auth-form-group">
                <label className="auth-label">Cover Image URL</label>
                <input
                  type="url"
                  name="cover_img"
                  value={formData.cover_img}
                  onChange={handleInputChange}
                  placeholder="https://example.com/cover.jpg"
                  className="auth-input"
                />
              </div>

              <div className="auth-form-group">
                <label className="auth-label">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter manga description"
                  className="auth-input"
                  rows="3"
                  style={{ resize: "vertical" }}
                />
              </div>

              <div className="auth-form-group">
                <label className="auth-label">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="auth-input"
                >
                  <option value="">Select Status</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="hiatus">Hiatus</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div className="form-row">
                <div className="auth-form-group">
                  <label className="auth-label">Total Chapters</label>
                  <input
                    type="number"
                    name="total_chapters"
                    value={formData.total_chapters}
                    onChange={handleNumberChange}
                    className="auth-input"
                    min="0"
                  />
                </div>

                <div className="auth-form-group">
                  <label className="auth-label">Russian Chapters</label>
                  <input
                    type="number"
                    name="total_chapters_rus"
                    value={formData.total_chapters_rus}
                    onChange={handleNumberChange}
                    className="auth-input"
                    min="0"
                  />
                </div>

                <div className="auth-form-group">
                  <label className="auth-label">English Chapters</label>
                  <input
                    type="number"
                    name="total_chapters_eng"
                    value={formData.total_chapters_eng}
                    onChange={handleNumberChange}
                    className="auth-input"
                    min="0"
                  />
                </div>
              </div>

              <div className="auth-form-group">
                <label className="auth-label">Authors</label>
                <div>
                  <input
                    type="text"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="Add author"
                    className="auth-input"
                    style={{ flex: 1 }}
                  />
                  <button
                    type="button"
                    onClick={addAuthor}
                    className="auth-submit-btn"
                  >
                    Add
                  </button>
                </div>
                <div className="tags-container">
                  {formData.authors.map((author, index) => (
                    <span key={index} className="tag">
                      {author}
                      <button
                        type="button"
                        onClick={() => removeAuthor(index)}
                        className="tag-remove"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="auth-form-group">
                <label className="auth-label">Genres</label>
                <div>
                  <input
                    type="text"
                    value={newGenre}
                    onChange={(e) => setNewGenre(e.target.value)}
                    placeholder="Add genre"
                    className="auth-input"
                    style={{ flex: 1 }}
                  />
                  <button
                    type="button"
                    onClick={addGenre}
                    className="auth-submit-btn"
                  >
                    Add
                  </button>
                </div>
                <div className="tags-container">
                  {formData.genres.map((genre, index) => (
                    <span key={index} className="tag">
                      {genre}
                      <button
                        type="button"
                        onClick={() => removeGenre(index)}
                        className="tag-remove"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="auth-form-group">
                <label className="auth-label">Tags</label>
                <div>
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add tag"
                    className="auth-input"
                    style={{ flex: 1 }}
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="auth-submit-btn"
                  >
                    Add
                  </button>
                </div>
                <div className="tags-container">
                  {formData.tags.map((tag, index) => (
                    <span key={index} className="tag">
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(index)}
                        className="tag-remove"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="auth-submit-btn"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Manga"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateManga;
