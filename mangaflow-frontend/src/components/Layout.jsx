import { Link, Outlet } from "react-router-dom";
import { BookOpen, Home, Plus } from "lucide-react";

export function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <BookOpen className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">
                  MangaFlow
                </span>
              </Link>
            </div>

            <nav className="flex space-x-8">
              <Link
                to="/"
                className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                <Home className="h-4 w-4" />
                <span>Главная</span>
              </Link>
              <Link
                to="/manga"
                className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                <BookOpen className="h-4 w-4" />
                <span>Манга</span>
              </Link>
              <Link
                to="/manga/add"
                className="flex items-center space-x-1 bg-blue-600 text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">
                <Plus className="h-4 w-4" />
                <span>Добавить</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}

