import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/config/axios";
import Input from "@/elements/Input/Input";
import Button from "@/elements/Button/Button";
import Alert from "@/elements/Alert/Alert";
import styles from "./CreateMangaForm.module.scss";

function CreateMangaForm() {
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
          <label className={styles.createMangaForm__label}>Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange("description")(e.target.value)}
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
        {loading ? "Creating..." : "Create Manga"}
      </Button>
    </form>
  );
}

export default CreateMangaForm;
