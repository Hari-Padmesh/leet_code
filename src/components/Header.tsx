import React from 'react';
import { Code, User, Trophy, Home, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  user: { name: string; solved: number; total: number };
  onNavigate: (view: 'home' | 'problems') => void;
  currentView: string;
}

const Header: React.FC<HeaderProps> = ({ user, onNavigate, currentView }) => {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Code className="w-8 h-8" />
            <h1 className="text-2xl font-bold">CodePractice</h1>
          </div>
          
          <nav className="flex items-center space-x-6">
            <button
              onClick={() => onNavigate('home')}
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                currentView === 'home' ? 'bg-blue-700' : 'hover:bg-blue-700'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>
            
            <div className="flex items-center space-x-4 bg-blue-700 px-4 py-2 rounded-lg">
              <User className="w-5 h-5" />
              <span className="font-medium">{user.name}</span>
              <div className="flex items-center space-x-1">
                <Trophy className="w-4 h-4 text-yellow-300" />
                <span className="text-sm">{user.solved} solved</span>
              </div>
              <button
                onClick={handleSignOut}
                className="ml-2 p-1 hover:bg-blue-600 rounded transition-colors"
                title="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;