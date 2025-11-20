import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config/api.js";
import Alert from "../pageComponents/common/Alert.jsx";
import AuthBackground from "../pageComponents/common/AuthBackground.jsx";
import AuthLogo from "../pageComponents/common/AuthLogo.jsx";
import SideImage from "../pageComponents/common/SideImage.jsx";
import useAuth from "../hooks/useAuth.js";
import "../styles/Auth.css";
import axiosInstance from "../config/axios.js";

function MangaLibrary() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axiosInstance.get("/books");
      setBooks(response.data.data.books || []);
    } catch (err) {
      console.error("Error fetching books:", err);
      setError(err.response?.data?.message || "Failed to fetch books");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
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

  return (
    <div className="auth-page">
      <AuthBackground />

      <div className="auth-content-wrapper">
        <SideImage />

        <div className="auth-container">
          <AuthLogo subtitle="Manga Library" />

          <div className="auth-card">
            <div>
              <h2>Manga Library</h2>
              <Link
                to={isAuthenticated ? "/manga/create" : "/login"}
                className="auth-submit-btn"
              >
                {isAuthenticated ? "Add New Manga" : "Login to Add Manga"}
              </Link>
            </div>

            <Alert type="error" message={error} />

            {books.length === 0 ? (
              <div>
                <p>No manga found in the library.</p>
                <Link
                  to={isAuthenticated ? "/manga/create" : "/login"}
                  className="auth-submit-btn"
                >
                  {isAuthenticated
                    ? "Add Your First Manga"
                    : "Login to Add Manga"}
                </Link>
              </div>
            ) : (
              <div className="books-grid">
                {books.map((book) => (
                  <div key={book.id} className="book-card">
                    {book.cover_img ? (
                      <img
                        src={book.cover_img}
                        alt={book.name}
                        className="book-cover"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="book-cover-placeholder">No Cover</div>
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
                          {book.bookGenres
                            .map((bg) => bg.genre.name)
                            .join(", ")}
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
    </div>
  );
}

export default MangaLibrary;
