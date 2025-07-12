import React, { useState } from 'react';
import { Code, CheckCircle, XCircle, Home, User, Trophy, BookOpen } from 'lucide-react';
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

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'problems' | 'solve'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [user, setUser] = useState({ name: 'Student', solved: 0, total: 0 });

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
    setUser(prev => ({ ...prev, solved: prev.solved + 1 }));
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
        user={user} 
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
              user={user}
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
            />
          )}
          
          {currentView === 'solve' && selectedProblem && (
            <ProblemSolver 
              problem={selectedProblem}
              onSolved={handleProblemSolved}
              onBack={handleBackToProblems}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;