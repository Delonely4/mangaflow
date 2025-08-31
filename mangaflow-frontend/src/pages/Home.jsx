import { Link } from "react-router-dom";
import { BookOpen, Plus, Search, BarChart3 } from "lucide-react";

export function Home() {
  return (
    <div className="text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Добро пожаловать в MangaFlow
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Управляйте своей коллекцией манги и аниме с легкостью
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Просмотр коллекции
            </h3>
            <p className="text-gray-600 mb-4">
              Изучайте свою библиотеку манги и аниме
            </p>
            <Link
              to="/manga"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              <Search className="h-4 w-4 mr-2" />
              Просмотреть
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <Plus className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Добавить мангу
            </h3>
            <p className="text-gray-600 mb-4">
              Добавляйте новые произведения в свою коллекцию
            </p>
            <Link
              to="/manga/add"
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Добавить
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <BarChart3 className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Статистика
            </h3>
            <p className="text-gray-600 mb-4">
              Анализируйте свои предпочтения и прогресс
            </p>
            <button className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
              <BarChart3 className="h-4 w-4 mr-2" />
              Статистика
            </button>
          </div>
        </div>

        <div className="bg-blue-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Начните прямо сейчас
          </h2>
          <p className="text-gray-600 mb-6">
            Создайте свою первую запись о манге и начните отслеживать свой
            прогресс
          </p>
          <Link
            to="/manga/add"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-lg font-medium">
            <Plus className="h-5 w-5 mr-2" />
            Добавить первую мангу
          </Link>
        </div>
      </div>
    </div>
  );
}

