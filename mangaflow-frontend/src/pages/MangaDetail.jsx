import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Edit, Trash2, BookOpen } from "lucide-react";
import { api } from "../services/api";

export function MangaDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: manga,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["manga", id],
    queryFn: () => api.get(`/manga/${id}`).then((res) => res.data.data),
  });

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Загрузка информации о манге...</p>
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
          Не удалось загрузить информацию о манге
        </p>
        <button
          onClick={() => navigate("/manga")}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Вернуться к списку
        </button>
      </div>
    );
  }

  if (!manga) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Манга не найдена
        </h3>
        <button
          onClick={() => navigate("/manga")}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Вернуться к списку
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-8">
        <button
          onClick={() => navigate("/manga")}
          className="mr-4 p-2 text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-3xl font-bold text-gray-900">{manga.name}</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Основная информация */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  {manga.name}
                </h2>
                {manga.name_eng && (
                  <p className="text-lg text-gray-600 mb-4">{manga.name_eng}</p>
                )}
                {manga.description && (
                  <p className="text-gray-700 leading-relaxed">
                    {manga.description}
                  </p>
                )}
              </div>

              {/* Детали */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
                    Статус
                  </h3>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {manga.status}
                  </span>
                </div>

                {manga.total_chapters && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
                      Глав
                    </h3>
                    <p className="text-lg font-semibold text-gray-900">
                      {manga.total_chapters}
                    </p>
                  </div>
                )}

                {manga.publication_year && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
                      Год публикации
                    </h3>
                    <p className="text-lg font-semibold text-gray-900">
                      {manga.publication_year}
                    </p>
                  </div>
                )}

                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
                    Дата создания
                  </h3>
                  <p className="text-lg font-semibold text-gray-900">
                    {new Date(manga.created_at).toLocaleDateString("ru-RU")}
                  </p>
                </div>
              </div>
            </div>

            {/* Боковая панель */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Действия
                </h3>

                <div className="space-y-3">
                  <button className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    <Edit className="h-4 w-4 mr-2" />
                    Редактировать
                  </button>

                  <button className="w-full flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Удалить
                  </button>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
                    ID записи
                  </h4>
                  <p className="text-sm text-gray-600 font-mono">{manga.id}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

