import { Helmet } from "react-helmet-async";
import MainLayout from "../../../layouts/MainLayout/MainLayout";
import CreateMangaForm from "../../../components/manga/CreateMangaForm/CreateMangaForm";
import styles from "./CreateManga.module.scss";

function CreateManga() {
  return (
    <>
      <Helmet>
        <title>Create Manga - MangaFlow</title>
        <meta name="description" content="Add new manga to your library" />
      </Helmet>

      <MainLayout>
        <div className={styles.createManga}>
          <div className={styles.createManga__header}>
            <h1 className={styles.createManga__title}>Create New Manga</h1>
            <p className={styles.createManga__subtitle}>
              Add a new manga to your personal library
            </p>
          </div>

          <div className={styles.createManga__content}>
            <CreateMangaForm />
          </div>
        </div>
      </MainLayout>
    </>
  );
}

export default CreateManga;
