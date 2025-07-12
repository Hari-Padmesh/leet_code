import React from 'react';
import { Code, Trophy, Target, BookOpen, ChevronRight } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  description: string;
}

interface HomePageProps {
  categories: Category[];
  user: { name: string; solved: number; total: number };
  onCategorySelect: (categoryId: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ categories, user, onCategorySelect }) => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to CodePractice
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Practice your programming skills with interactive coding problems. 
          Build confidence through hands-on exercises designed for learning.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Code className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Interactive Problems</h3>
          <p className="text-gray-600">Code directly in your browser with instant feedback</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Target className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Progressive Difficulty</h3>
          <p className="text-gray-600">Start easy and gradually build up your skills</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Track Progress</h3>
          <p className="text-gray-600">See your improvement as you solve more problems</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <BookOpen className="w-6 h-6 mr-3" />
          Problem Categories
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategorySelect(category.id)}
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-left group"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{category.name}</h3>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
              </div>
              <p className="text-sm text-gray-600">{category.description}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Start Coding?</h2>
        <p className="mb-6 opacity-90">
          Choose a category above and begin solving problems to improve your programming skills.
        </p>
        <button
          onClick={() => onCategorySelect('warmup')}
          className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          Start with Warmup Problems
        </button>
      </div>
    </div>
  );
};

export default HomePage;