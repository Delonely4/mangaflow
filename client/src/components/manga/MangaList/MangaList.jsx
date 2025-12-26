import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks";
import BookGrid from "@/pageComponents/manga/BookGrid/BookGrid";
import BookCard from "@/pageComponents/manga/BookCard/BookCard";
import EditMangaModal from "@/pageComponents/manga/EditMangaModal/EditMangaModal";
import Button from "@/elements/Button/Button";
import Alert from "@/elements/Alert/Alert";
import styles from "./MangaList.module.scss";
import { getAllBooks, deleteBook } from "@/api/booksApi";

function MangaList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editManga, setEditManga] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const result = await getAllBooks();

    if (!result.success) {
      setError(result.error);
      setLoading(false);
      return;
    }

    setBooks(result.data.books || []);
    setLoading(false);
  };

  const handleEdit = (book) => {
    setSelectedBook(book);
    setEditManga(true);
  };

  const handleBookUpdate = (updatedBook) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) => (book.id === updatedBook.id ? updatedBook : book))
    );
  };

  const handleDelete = async (bookId) => {
    if (!window.confirm("Are you sure you want to delete this manga?")) {
      return;
    }

    const result = await deleteBook(bookId);

    if (!result.success) {
      setError(result.error);
      return;
    }

    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
  };

  if (loading) {
    return (
      <div className={styles.mangaList}>
        <div className={styles.mangaList__loading}>Loading...</div>
      </div>
    );
  }

  return (
    <div className={styles.mangaList}>
      <div className={styles.mangaList__header}>
        <h1 className={styles.mangaList__title}>Manga Library</h1>
        {isAuthenticated && (
          <Link to="/manga/create">
            <Button variant="primary">Add New Manga</Button>
          </Link>
        )}
      </div>
      <Alert type="error" message={error} />
      {books.length === 0 ? (
        <div className={styles.mangaList__empty}>
          <p className={styles.mangaList__emptyText}>
            No manga found in the library.
          </p>
          {isAuthenticated ? (
            <Link to="/manga/create">
              <Button variant="primary">Add Your First Manga</Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button variant="primary">Login to Add Manga</Button>
            </Link>
          )}
        </div>
      ) : (
        <BookGrid>
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onEdit={() => handleEdit(book)}
              onDelete={() => handleDelete(book.id)}
              showActions={isAuthenticated}
            />
          ))}
        </BookGrid>
      )}
      <EditMangaModal
        isOpen={editManga}
        book={selectedBook}
        onClose={() => setEditManga(false)}
        onUpdate={handleBookUpdate}
      />
    </div>
  );
}

export default MangaList;
