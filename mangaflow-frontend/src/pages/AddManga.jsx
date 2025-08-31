import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { BookOpen, Save, ArrowLeft } from "lucide-react";
import { api } from "../services/api";

export function AddManga() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: "",
    name_eng: "",
    description: "",
    status: "ONGOING",
    total_chapters: "",
    publication_year: "",
  });

  const createMangaMutation = useMutation({
    mutationFn: (data) => api.post("/manga", data),
    onSuccess: () => {
      queryClient.invalidateQueries(["mangas"]);
      navigate("/manga");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createMangaMutation.mutate(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center mb-8">
        <button
          onClick={() => navigate("/manga")}
          className="mr-4 p-2 text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Добавить мангу</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2">
              Название *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Введите название манги"
            />
          </div>

          <div>
            <label
              htmlFor="name_eng"
              className="block text-sm font-medium text-gray-700 mb-2">
              Название на английском
            </label>
            <input
              type="text"
              id="name_eng"
              name="name_eng"
              value={formData.name_eng}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="English title"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2">
              Описание
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Краткое описание манги"
            />
          </div>

          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 mb-2">
              Статус
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="ONGOING">Выходит</option>
              <option value="COMPLETED">Завершена</option>
              <option value="HIATUS">На паузе</option>
              <option value="CANCELLED">Отменена</option>
              <option value="ANNOUNCED">Анонсирована</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="total_chapters"
                className="block text-sm font-medium text-gray-700 mb-2">
                Количество глав
              </label>
              <input
                type="number"
                id="total_chapters"
                name="total_chapters"
                value={formData.total_chapters}
                onChange={handleChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>

            <div>
              <label
                htmlFor="publication_year"
                className="block text-sm font-medium text-gray-700 mb-2">
                Год публикации
              </label>
              <input
                type="number"
                id="publication_year"
                name="publication_year"
                value={formData.publication_year}
                onChange={handleChange}
                min="1900"
                max={new Date().getFullYear()}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="2023"
              />
            </div>
          </div>

          {createMangaMutation.isError && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <p className="text-red-800">
                Ошибка:{" "}
                {createMangaMutation.error?.response?.data?.error ||
                  "Не удалось добавить мангу"}
              </p>
            </div>
          )}

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate("/manga")}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
              Отмена
            </button>
            <button
              type="submit"
              disabled={createMangaMutation.isLoading}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50">
              {createMangaMutation.isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Сохранение...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Сохранить
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

