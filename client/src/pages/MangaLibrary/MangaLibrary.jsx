import { Helmet } from "react-helmet-async";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import MangaList from "@/components/manga/MangaList/MangaList";
import styles from "./MangaLibrary.module.scss";

function MangaLibrary() {
  return (
    <>
      <Helmet>
        <title>Manga Library - MangaFlow</title>
        <meta name="description" content="Browse our collection of manga" />
      </Helmet>

      <MainLayout>
        <div className={styles.mangaLibrary}>
          <MangaList />
        </div>
      </MainLayout>
    </>
  );
}

export default MangaLibrary;
