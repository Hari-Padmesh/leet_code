import React from 'react';
import { BookOpen, ChevronRight } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  description: string;
}

interface SidebarProps {
  categories: Category[];
  selectedCategory: string;
  onCategorySelect: (categoryId: string) => void;
  onHomeClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  categories, 
  selectedCategory, 
  onCategorySelect,
  onHomeClick 
}) => {
  return (
    <aside className="w-64 bg-white shadow-lg border-r">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <BookOpen className="w-5 h-5 mr-2" />
          Problem Categories
        </h2>
        
        <nav className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategorySelect(category.id)}
              className={`w-full text-left p-3 rounded-lg transition-colors flex items-center justify-between group ${
                selectedCategory === category.id
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <div>
                <div className="font-medium">{category.name}</div>
                <div className="text-xs text-gray-500 mt-1">{category.description}</div>
              </div>
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;