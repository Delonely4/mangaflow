import styles from "./BookCard.module.scss";

function BookCard({ book, onEdit, onDelete, showActions = false }) {
  return (
    <div className={styles.bookCard}>
      <div className={styles.bookCard__cover}>
        {book.cover_img ? (
          <img
            src={book.cover_img}
            alt={book.name}
            className={styles.bookCard__image}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        ) : (
          <div className={styles.bookCard__placeholder}>No Cover</div>
        )}
      </div>

      <div className={styles.bookCard__content}>
        <h3 className={styles.bookCard__title}>{book.name}</h3>
        <p className={styles.bookCard__description}>
          {book.description || "No description available"}
        </p>

        {book.bookAuthors && book.bookAuthors.length > 0 && (
          <div className={styles.bookCard__meta}>
            <strong>Authors:</strong>{" "}
            {book.bookAuthors.map((ba) => ba.author.name).join(", ")}
          </div>
        )}

        {book.bookGenres && book.bookGenres.length > 0 && (
          <div className={styles.bookCard__meta}>
            <strong>Genres:</strong>{" "}
            {book.bookGenres.map((bg) => bg.genre.name).join(", ")}
          </div>
        )}

        <div className={styles.bookCard__stats}>
          <span>Chapters: {book.total_chapters}</span>
          {book.status && (
            <span
              className={`${styles.bookCard__status} ${
                styles[`bookCard__status--${book.status}`]
              }`}
            >
              {book.status}
            </span>
          )}
        </div>

        {showActions && (
          <div className={styles.bookCard__actions}>
            <button
              type="button"
              onClick={onEdit}
              className={styles.bookCard__action}
            >
              Edit
            </button>
            <button
              type="button"
              onClick={onDelete}
              className={`${styles.bookCard__action} ${styles["bookCard__action--delete"]}`}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookCard;
