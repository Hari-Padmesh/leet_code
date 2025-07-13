import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { useProgress } from './hooks/useProgress';
import AuthForm from './components/AuthForm';
import ProblemList from './components/ProblemList';
import ProblemSolver from './components/ProblemSolver';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import HomePage from './components/HomePage';

export interface Problem {
  id: string;
  title: string;
  description: string;
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
  testCases: Array<{
    input: string;
    expected: string;
  }>;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  functionSignature: string;
  solved: boolean;
}

function AppContent() {
  const { user, loading: authLoading } = useAuth();
  const { getSolvedCount, updateProgress, getProblemProgress } = useProgress();
  const [currentView, setCurrentView] = useState<'home' | 'problems' | 'solve'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthForm mode={authMode} onToggleMode={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')} />;
  }

  const userStats = {
    name: user.user_metadata?.name || user.email?.split('@')[0] || 'Student',
    solved: getSolvedCount(),
    total: 0
  };

  const categories = [
    { id: 'warmup', name: 'Warmup-1', description: 'Simple warmup problems with if/else logic' },
    { id: 'string', name: 'String-1', description: 'Basic string manipulation problems' },
    { id: 'array', name: 'Array-1', description: 'Basic array and list problems' },
    { id: 'logic', name: 'Logic-1', description: 'Boolean logic and conditional problems' },
    { id: 'loops', name: 'Loops-1', description: 'Basic loop and iteration problems' },
    { id: 'math', name: 'Math-1', description: 'Basic mathematical computation problems' }
  ];

  const handleProblemSelect = (problem: Problem) => {
    setSelectedProblem(problem);
    setCurrentView('solve');
  };

  const handleProblemSolved = (problemId: string) => {
    updateProgress(problemId, true);
    setCurrentView('problems');
    setSelectedProblem(null);
  };

  const handleBackToProblems = () => {
    setCurrentView('problems');
    setSelectedProblem(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        user={userStats} 
        onNavigate={(view) => setCurrentView(view)}
        currentView={currentView}
      />
      
      <div className="flex">
        <Sidebar 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={(categoryId) => {
            setSelectedCategory(categoryId);
            setCurrentView('problems');
          }}
          onHomeClick={() => setCurrentView('home')}
        />
        
        <main className="flex-1 p-6">
          {currentView === 'home' && (
            <HomePage 
              categories={categories}
              user={userStats}
              onCategorySelect={(categoryId) => {
                setSelectedCategory(categoryId);
                setCurrentView('problems');
              }}
            />
          )}
          
          {currentView === 'problems' && (
            <ProblemList 
              category={selectedCategory}
              onProblemSelect={handleProblemSelect}
              getProblemProgress={getProblemProgress}
            />
          )}
          
          {currentView === 'solve' && selectedProblem && (
            <ProblemSolver 
              problem={selectedProblem}
              onSolved={handleProblemSolved}
              onBack={handleBackToProblems}
              getProblemProgress={getProblemProgress}
              updateProgress={updateProgress}
            />
          )}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;