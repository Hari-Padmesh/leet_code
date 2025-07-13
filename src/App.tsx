import React, { useState } from 'react';
import { Code, CheckCircle, XCircle, Home, User, Trophy, BookOpen, LogOut } from 'lucide-react';
import ProblemList from './components/ProblemList';
import ProblemSolver from './components/ProblemSolver';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import HomePage from './components/HomePage';
import AuthForm from './components/AuthForm';
import { useAuth } from './hooks/useAuth';
import { useProgress } from './hooks/useProgress';

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

function App() {
  const { user, loading: authLoading, signOut } = useAuth();
  const { progress, updateProgress, getProblemProgress, getSolvedCount } = useProgress(user);
  
  const [currentView, setCurrentView] = useState<'home' | 'problems' | 'solve'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthForm onAuthSuccess={() => {}} />;
  }

  const userProfile = {
    name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Student',
    email: user.email || '',
    solved: getSolvedCount(),
    total: progress.length
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

  const handleProblemSolved = async (problemId: string, category: string, solution: string) => {
    await updateProgress(problemId, category, true, solution);
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
        user={userProfile} 
        onNavigate={(view) => setCurrentView(view)}
        currentView={currentView}
        onSignOut={signOut}
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
              user={userProfile}
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

export default App;