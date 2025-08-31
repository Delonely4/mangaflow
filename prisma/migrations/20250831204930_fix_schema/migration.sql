/*
  Warnings:

  - You are about to drop the column `name_eng` on the `Books` table. All the data in the column will be lost.
  - You are about to drop the column `publication_year` on the `Books` table. All the data in the column will be lost.
  - You are about to drop the `Book_Authors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Book_Genres` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Book_Tags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Readest_chapters` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reading_List_Items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reading_Lists` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Book_Authors" DROP CONSTRAINT "Book_Authors_author_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Book_Authors" DROP CONSTRAINT "Book_Authors_book_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Book_Genres" DROP CONSTRAINT "Book_Genres_book_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Book_Genres" DROP CONSTRAINT "Book_Genres_genre_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Book_Tags" DROP CONSTRAINT "Book_Tags_book_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Book_Tags" DROP CONSTRAINT "Book_Tags_tag_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Readest_chapters" DROP CONSTRAINT "Readest_chapters_book_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Readest_chapters" DROP CONSTRAINT "Readest_chapters_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Reading_List_Items" DROP CONSTRAINT "Reading_List_Items_book_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Reading_List_Items" DROP CONSTRAINT "Reading_List_Items_list_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Reading_Lists" DROP CONSTRAINT "Reading_Lists_user_id_fkey";

-- AlterTable
ALTER TABLE "public"."Books" DROP COLUMN "name_eng",
DROP COLUMN "publication_year",
ADD COLUMN     "current_chapter" DOUBLE PRECISION,
ADD COLUMN     "total_chapters_eng" INTEGER,
ADD COLUMN     "total_chapters_rus" INTEGER;

-- DropTable
DROP TABLE "public"."Book_Authors";

-- DropTable
DROP TABLE "public"."Book_Genres";

-- DropTable
DROP TABLE "public"."Book_Tags";

-- DropTable
DROP TABLE "public"."Readest_chapters";

-- DropTable
DROP TABLE "public"."Reading_List_Items";

-- DropTable
DROP TABLE "public"."Reading_Lists";

-- CreateTable
CREATE TABLE "public"."Characters" (
    "id" TEXT NOT NULL,
    "book_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Characters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Readed_chapters" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "book_id" TEXT NOT NULL,
    "chapter_number" DOUBLE PRECISION NOT NULL,
    "language" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Readed_chapters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Favorite_characters" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "book_id" TEXT NOT NULL,
    "character_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Favorite_characters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Book_authors" (
    "book_id" TEXT NOT NULL,
    "author_id" TEXT NOT NULL,
    "role" "public"."AuthorRole" NOT NULL DEFAULT 'AUTHOR',

    CONSTRAINT "Book_authors_pkey" PRIMARY KEY ("book_id","author_id")
);

-- CreateTable
CREATE TABLE "public"."Book_genres" (
    "book_id" TEXT NOT NULL,
    "genre_id" TEXT NOT NULL,

    CONSTRAINT "Book_genres_pkey" PRIMARY KEY ("book_id","genre_id")
);

-- CreateTable
CREATE TABLE "public"."Book_tags" (
    "book_id" TEXT NOT NULL,
    "tag_id" TEXT NOT NULL,

    CONSTRAINT "Book_tags_pkey" PRIMARY KEY ("book_id","tag_id")
);

-- CreateTable
CREATE TABLE "public"."Character_genres" (
    "character_id" TEXT NOT NULL,
    "genre_id" TEXT NOT NULL,

    CONSTRAINT "Character_genres_pkey" PRIMARY KEY ("character_id","genre_id")
);

-- CreateTable
CREATE TABLE "public"."Quotes" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "book_id" TEXT NOT NULL,
    "chapter_id" TEXT,
    "content" TEXT NOT NULL,
    "chapter_number" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Quotes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Reading_list" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "is_public" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reading_list_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Reading_list_items" (
    "id" TEXT NOT NULL,
    "list_id" TEXT NOT NULL,
    "book_id" TEXT NOT NULL,
    "priority" INTEGER,
    "note" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reading_list_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Readed_chapters_user_id_book_id_chapter_number_language_key" ON "public"."Readed_chapters"("user_id", "book_id", "chapter_number", "language");

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_characters_user_id_character_id_key" ON "public"."Favorite_characters"("user_id", "character_id");

-- CreateIndex
CREATE UNIQUE INDEX "Reading_list_items_list_id_book_id_key" ON "public"."Reading_list_items"("list_id", "book_id");

-- AddForeignKey
ALTER TABLE "public"."Characters" ADD CONSTRAINT "Characters_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "public"."Books"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Readed_chapters" ADD CONSTRAINT "Readed_chapters_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Readed_chapters" ADD CONSTRAINT "Readed_chapters_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "public"."Books"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Favorite_characters" ADD CONSTRAINT "Favorite_characters_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Favorite_characters" ADD CONSTRAINT "Favorite_characters_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "public"."Characters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Book_authors" ADD CONSTRAINT "Book_authors_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "public"."Books"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Book_authors" ADD CONSTRAINT "Book_authors_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "public"."Authors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Book_genres" ADD CONSTRAINT "Book_genres_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "public"."Books"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Book_genres" ADD CONSTRAINT "Book_genres_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "public"."Genres"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Book_tags" ADD CONSTRAINT "Book_tags_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "public"."Books"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Book_tags" ADD CONSTRAINT "Book_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "public"."Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Character_genres" ADD CONSTRAINT "Character_genres_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "public"."Characters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Character_genres" ADD CONSTRAINT "Character_genres_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "public"."Genres"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Quotes" ADD CONSTRAINT "Quotes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Quotes" ADD CONSTRAINT "Quotes_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "public"."Books"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Reading_list" ADD CONSTRAINT "Reading_list_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Reading_list_items" ADD CONSTRAINT "Reading_list_items_list_id_fkey" FOREIGN KEY ("list_id") REFERENCES "public"."Reading_list"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Reading_list_items" ADD CONSTRAINT "Reading_list_items_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "public"."Books"("id") ON DELETE CASCADE ON UPDATE CASCADE;
