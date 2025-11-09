import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config/api.js";
import Alert from "../pageComponenst/common/Alert.jsx";
import AuthBackground from "../pageComponenst/common/AuthBackground.jsx";
import AuthLogo from "../pageComponenst/common/AuthLogo.jsx";
import "../styles/Auth.css";

function MangaLibrary() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/books`);
      console.log("Fetching books from:", `${API_BASE_URL}/books`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("API Response:", result);

      if (result.success) {
        setBooks(result.data.books || []);
      } else {
        setError(result.message || "Failed to fetch books");
      }
    } catch (err) {
      console.error("Error fetching books:", err);
      setError("Unable to connect to the server: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="auth-page">
        <div className="auth-container">
          <div className="auth-card">
            <h2>Loading...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <AuthBackground />

      <div className="auth-container" style={{ maxWidth: "800px" }}>
        <AuthLogo subtitle="Manga Library" />

        <div className="auth-card">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "30px",
            }}
          >
            <h2>Manga Library</h2>
            <Link
              to="/manga/create"
              className="auth-submit-btn"
              style={{
                padding: "10px 20px",
                width: "auto",
                textDecoration: "none",
              }}
            >
              Add New Manga
            </Link>
          </div>

          <Alert type="error" message={error} />

          {books.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px" }}>
              <p style={{ color: "#6c757d", marginBottom: "20px" }}>
                No manga found in the library.
              </p>
              <Link
                to="/manga/create"
                className="auth-submit-btn"
                style={{
                  padding: "12px 24px",
                  width: "auto",
                  textDecoration: "none",
                }}
              >
                Add Your First Manga
              </Link>
            </div>
          ) : (
            <div className="books-grid">
              {books.map((book) => (
                <div key={book.id} className="book-card">
                  {book.cover_img && (
                    <img
                      src={book.cover_img}
                      alt={book.name}
                      className="book-cover"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  )}
                  <div className="book-info">
                    <h3 className="book-title">{book.name}</h3>
                    <p className="book-description">
                      {book.description || "No description available"}
                    </p>

                    {book.bookAuthors && book.bookAuthors.length > 0 && (
                      <div className="book-meta">
                        <strong>Authors:</strong>{" "}
                        {book.bookAuthors
                          .map((ba) => ba.author.name)
                          .join(", ")}
                      </div>
                    )}

                    {book.bookGenres && book.bookGenres.length > 0 && (
                      <div className="book-meta">
                        <strong>Genres:</strong>{" "}
                        {book.bookGenres.map((bg) => bg.genre.name).join(", ")}
                      </div>
                    )}

                    <div className="book-stats">
                      <span>Chapters: {book.total_chapters}</span>
                      {book.status && (
                        <span className={`status ${book.status}`}>
                          {book.status}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MangaLibrary;
