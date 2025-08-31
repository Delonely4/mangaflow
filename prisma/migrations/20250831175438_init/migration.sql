-- CreateEnum
CREATE TYPE "public"."AuthorRole" AS ENUM ('AUTHOR', 'ARTIST', 'BOTH');

-- CreateEnum
CREATE TYPE "public"."BookStatus" AS ENUM ('ONGOING', 'COMPLETED', 'HIATUS', 'CANCELLED', 'ANNOUNCED');

-- CreateEnum
CREATE TYPE "public"."ReadingStatus" AS ENUM ('PLAN_TO_READ', 'READING', 'COMPLETED', 'ON_HOLD', 'DROPPED', 'REREADING');

-- CreateTable
CREATE TABLE "public"."Users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "avatar" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Books" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "name_eng" TEXT,
    "description" TEXT,
    "cover_image" TEXT,
    "status" "public"."BookStatus" NOT NULL DEFAULT 'ONGOING',
    "total_chapters" INTEGER,
    "publication_year" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Authors" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "name_eng" TEXT,
    "bio" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Authors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Genres" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Genres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Tags" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Chapters" (
    "id" TEXT NOT NULL,
    "book_id" TEXT NOT NULL,
    "number" DOUBLE PRECISION NOT NULL,
    "title" TEXT,
    "release_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Chapters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."User_books" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "book_id" TEXT NOT NULL,
    "status" "public"."ReadingStatus" NOT NULL DEFAULT 'PLAN_TO_READ',
    "current_chapter" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "personal_rating" INTEGER,
    "started_at" TIMESTAMP(3),
    "finished_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Readest_chapters" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "book_id" TEXT NOT NULL,
    "chapter_number" DOUBLE PRECISION NOT NULL,
    "language" TEXT NOT NULL,
    "read_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Readest_chapters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Favorites_books" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "book_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Favorites_books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Book_Authors" (
    "book_id" TEXT NOT NULL,
    "author_id" TEXT NOT NULL,
    "role" "public"."AuthorRole" NOT NULL DEFAULT 'AUTHOR',

    CONSTRAINT "Book_Authors_pkey" PRIMARY KEY ("book_id","author_id")
);

-- CreateTable
CREATE TABLE "public"."Book_Genres" (
    "book_id" TEXT NOT NULL,
    "genre_id" TEXT NOT NULL,

    CONSTRAINT "Book_Genres_pkey" PRIMARY KEY ("book_id","genre_id")
);

-- CreateTable
CREATE TABLE "public"."Book_Tags" (
    "book_id" TEXT NOT NULL,
    "tag_id" TEXT NOT NULL,

    CONSTRAINT "Book_Tags_pkey" PRIMARY KEY ("book_id","tag_id")
);

-- CreateTable
CREATE TABLE "public"."Reviews" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "book_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "is_spoiler" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Reading_Lists" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "is_public" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reading_Lists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Reading_List_Items" (
    "id" TEXT NOT NULL,
    "list_id" TEXT NOT NULL,
    "book_id" TEXT NOT NULL,
    "priority" INTEGER,
    "note" TEXT,
    "added_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reading_List_Items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "public"."Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "public"."Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Genres_name_key" ON "public"."Genres"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tags_name_key" ON "public"."Tags"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Chapters_book_id_number_key" ON "public"."Chapters"("book_id", "number");

-- CreateIndex
CREATE UNIQUE INDEX "User_books_user_id_book_id_key" ON "public"."User_books"("user_id", "book_id");

-- CreateIndex
CREATE UNIQUE INDEX "Readest_chapters_user_id_book_id_chapter_number_language_key" ON "public"."Readest_chapters"("user_id", "book_id", "chapter_number", "language");

-- CreateIndex
CREATE UNIQUE INDEX "Favorites_books_user_id_book_id_key" ON "public"."Favorites_books"("user_id", "book_id");

-- CreateIndex
CREATE UNIQUE INDEX "Reviews_user_id_book_id_key" ON "public"."Reviews"("user_id", "book_id");

-- CreateIndex
CREATE UNIQUE INDEX "Reading_List_Items_list_id_book_id_key" ON "public"."Reading_List_Items"("list_id", "book_id");

-- AddForeignKey
ALTER TABLE "public"."Chapters" ADD CONSTRAINT "Chapters_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "public"."Books"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."User_books" ADD CONSTRAINT "User_books_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."User_books" ADD CONSTRAINT "User_books_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "public"."Books"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Readest_chapters" ADD CONSTRAINT "Readest_chapters_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Readest_chapters" ADD CONSTRAINT "Readest_chapters_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "public"."Books"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Favorites_books" ADD CONSTRAINT "Favorites_books_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Favorites_books" ADD CONSTRAINT "Favorites_books_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "public"."Books"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Book_Authors" ADD CONSTRAINT "Book_Authors_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "public"."Books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Book_Authors" ADD CONSTRAINT "Book_Authors_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "public"."Authors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Book_Genres" ADD CONSTRAINT "Book_Genres_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "public"."Books"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Book_Genres" ADD CONSTRAINT "Book_Genres_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "public"."Genres"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Book_Tags" ADD CONSTRAINT "Book_Tags_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "public"."Books"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Book_Tags" ADD CONSTRAINT "Book_Tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "public"."Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Reviews" ADD CONSTRAINT "Reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Reviews" ADD CONSTRAINT "Reviews_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "public"."Books"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Reading_Lists" ADD CONSTRAINT "Reading_Lists_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Reading_List_Items" ADD CONSTRAINT "Reading_List_Items_list_id_fkey" FOREIGN KEY ("list_id") REFERENCES "public"."Reading_Lists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Reading_List_Items" ADD CONSTRAINT "Reading_List_Items_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "public"."Books"("id") ON DELETE CASCADE ON UPDATE CASCADE;
