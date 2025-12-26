import { useState, useEffect } from "react";
import Input from "@/elements/Input/Input";
import Button from "@/elements/Button/Button";
import Alert from "@/elements/Alert/Alert";
import styles from "./EditMangaModal.module.scss";
import { updateBook } from "@/api/booksApi";

function EditMangaModal({ isOpen, book, onClose, onUpdate }) {
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

  useEffect(() => {
    if (book) {
      const flatAuthors = book.bookAuthors
        ? book.bookAuthors.map((item) => item.author.name)
        : [];

      const flatGenres = book.bookGenres
        ? book.bookGenres.map((item) => item.genre.name)
        : [];

      setFormData({
        name: book.name || "",
        cover_img: book.cover_img || "",
        status: book.status || "",
        total_chapters: book.total_chapters || 0,
        total_chapters_rus: book.total_chapters_rus || 0,
        total_chapters_eng: book.total_chapters_eng || 0,
        authors: flatAuthors,
        genres: flatGenres,
        tags: book.tags || [],
      });
    }
  }, [book]);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newGenre, setNewGenre] = useState("");
  const [newTag, setNewTag] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field) => (value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNumberChange = (field) => (value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: parseInt(value) || 0,
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

    const result = await updateBook(book.id, formData);

    if (!result.success) {
      setError(result.error);
      setLoading(false);
      return;
    }

    setSuccess("Manga updated successfully!");
    setLoading(false);

    if (onUpdate) {
      onUpdate(result.data.book);
    }

    setTimeout(() => {
      onClose();
      window.location.reload();
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <form onSubmit={handleSubmit} className={styles.createMangaForm}>
          <Alert type="success" message={success} />
          <Alert type="error" message={error} />

          <div className={styles.createMangaForm__section}>
            <Input
              label="Manga Title *"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name")(e.target.value)}
              placeholder="Enter manga title"
              required
            />

            <Input
              label="Cover Image URL"
              type="url"
              value={formData.cover_img}
              onChange={(e) => handleInputChange("cover_img")(e.target.value)}
              placeholder="https://example.com/cover.jpg"
            />

            <div className={styles.createMangaForm__textareaGroup}>
              <label className={styles.createMangaForm__label}>
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description")(e.target.value)
                }
                placeholder="Enter manga description"
                className={styles.createMangaForm__textarea}
                rows="3"
              />
            </div>

            <div className={styles.createMangaForm__selectGroup}>
              <label className={styles.createMangaForm__label}>Status</label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange("status")(e.target.value)}
                className={styles.createMangaForm__select}
              >
                <option value="">Select Status</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
                <option value="hiatus">Hiatus</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className={styles.createMangaForm__section}>
            <h3 className={styles.createMangaForm__sectionTitle}>Chapters</h3>
            <div className={styles.createMangaForm__chapters}>
              <Input
                label="Total Chapters"
                type="number"
                value={formData.total_chapters}
                onChange={(e) =>
                  handleNumberChange("total_chapters")(e.target.value)
                }
                min="0"
              />
              <Input
                label="Russian Chapters"
                type="number"
                value={formData.total_chapters_rus}
                onChange={(e) =>
                  handleNumberChange("total_chapters_rus")(e.target.value)
                }
                min="0"
              />
              <Input
                label="English Chapters"
                type="number"
                value={formData.total_chapters_eng}
                onChange={(e) =>
                  handleNumberChange("total_chapters_eng")(e.target.value)
                }
                min="0"
              />
            </div>
          </div>

          <div className={styles.createMangaForm__section}>
            <h3 className={styles.createMangaForm__sectionTitle}>Authors</h3>
            <div className={styles.createMangaForm__tagInput}>
              <Input
                label="Add Author"
                type="text"
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
                placeholder="Enter author name"
              />
              <Button
                type="button"
                variant="outline"
                onClick={addAuthor}
                className={styles.createMangaForm__addButton}
              >
                Add
              </Button>
            </div>
            <div className={styles.createMangaForm__tags}>
              {formData.authors.map((author, index) => (
                <span key={index} className={styles.createMangaForm__tag}>
                  {author}
                  <button
                    type="button"
                    onClick={() => removeAuthor(index)}
                    className={styles.createMangaForm__tagRemove}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className={styles.createMangaForm__section}>
            <h3 className={styles.createMangaForm__sectionTitle}>Genres</h3>
            <div className={styles.createMangaForm__tagInput}>
              <Input
                label="Add Genre"
                type="text"
                value={newGenre}
                onChange={(e) => setNewGenre(e.target.value)}
                placeholder="Enter genre"
              />
              <Button
                type="button"
                variant="outline"
                onClick={addGenre}
                className={styles.createMangaForm__addButton}
              >
                Add
              </Button>
            </div>
            <div className={styles.createMangaForm__tags}>
              {formData.genres.map((genre, index) => (
                <span key={index} className={styles.createMangaForm__tag}>
                  {genre}
                  <button
                    type="button"
                    onClick={() => removeGenre(index)}
                    className={styles.createMangaForm__tagRemove}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className={styles.createMangaForm__section}>
            <h3 className={styles.createMangaForm__sectionTitle}>Tags</h3>
            <div className={styles.createMangaForm__tagInput}>
              <Input
                label="Add Tag"
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Enter tag"
              />
              <Button
                type="button"
                variant="outline"
                onClick={addTag}
                className={styles.createMangaForm__addButton}
              >
                Add
              </Button>
            </div>
            <div className={styles.createMangaForm__tags}>
              {formData.tags.map((tag, index) => (
                <span key={index} className={styles.createMangaForm__tag}>
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(index)}
                    className={styles.createMangaForm__tagRemove}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="large"
            loading={loading}
            className={styles.createMangaForm__submit}
          >
            {loading ? "Updating..." : "Update Manga"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default EditMangaModal;
