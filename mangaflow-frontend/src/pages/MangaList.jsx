import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { BookOpen, Plus, Search } from "lucide-react";
import { api } from "../services/api";

export function MangaList() {
  const {
    data: mangas,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["mangas"],
    queryFn: () => api.get("/manga").then((res) => res.data.data),
  });

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Загрузка манги...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">
          <BookOpen className="h-12 w-12 mx-auto" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Ошибка загрузки
        </h3>
        <p className="text-gray-600 mb-4">
          Не удалось загрузить список манги. Попробуйте позже.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Попробовать снова
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Моя коллекция манги
          </h1>
          <p className="text-gray-600 mt-2">
            Всего манги: {mangas?.length || 0}
          </p>
        </div>
        <Link
          to="/manga/add"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Добавить мангу
        </Link>
      </div>

      {mangas?.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Коллекция пуста
          </h3>
          <p className="text-gray-600 mb-6">
            Добавьте свою первую мангу, чтобы начать
          </p>
          <Link
            to="/manga/add"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            <Plus className="h-5 w-5 mr-2" />
            Добавить мангу
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mangas?.map((manga) => (
            <div
              key={manga.id}
              className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {manga.name}
                </h3>
                {manga.name_eng && (
                  <p className="text-sm text-gray-600 mb-3">{manga.name_eng}</p>
                )}
                {manga.description && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {manga.description}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {manga.status}
                  </span>
                  <Link
                    to={`/manga/${manga.id}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800">
                    <Search className="h-4 w-4 mr-1" />
                    Подробнее
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

