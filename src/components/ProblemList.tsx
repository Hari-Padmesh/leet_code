import React from 'react';
import { CheckCircle, Circle, Star, Clock } from 'lucide-react';
import { Problem } from '../App';
import { getProblemsForCategory } from '../data/problems';
import { ProblemProgress } from '../lib/supabase';

interface ProblemListProps {
  category: string;
  onProblemSelect: (problem: Problem) => void;
  getProblemProgress: (problemId: string) => ProblemProgress | undefined;
}

const ProblemList: React.FC<ProblemListProps> = ({ category, onProblemSelect, getProblemProgress }) => {
  const problems = getProblemsForCategory(category);
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const categoryNames: { [key: string]: string } = {
    warmup: 'Warmup-1',
    string: 'String-1',
    array: 'Array-1',
    logic: 'Logic-1',
    loops: 'Loops-1',
    math: 'Math-1'
  };

  if (!problems.length) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 mb-4">
          <Circle className="w-16 h-16 mx-auto mb-4 opacity-50" />
        </div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">No problems found</h2>
        <p className="text-gray-500">Select a category from the sidebar to view problems.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {categoryNames[category] || 'Problems'}
        </h1>
        <p className="text-gray-600">
          Complete these coding challenges to improve your programming skills.
        </p>
        <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
          <span className="flex items-center">
            <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
            {problems.filter(p => getProblemProgress(p.id)?.solved).length} solved
          </span>
          <span className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {problems.length} total problems
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {problems.map((problem) => (
          const problemProgress = getProblemProgress(problem.id);
          const isSolved = problemProgress?.solved || false;
          
          <div
            key={problem.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onProblemSelect(problem)}
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {isSolved ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-400" />
                    )}
                    <h3 className="text-lg font-semibold text-gray-900">
                      {problem.title}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}>
                      {problem.difficulty}
                    </span>
                  </div>
                  
                  {problemProgress && (
                    <div className="mb-2 text-xs text-gray-500">
                      Attempts: {problemProgress.attempts}
                      {problemProgress.solved_at && (
                        <span className="ml-2">
                          Solved: {new Date(problemProgress.solved_at).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  )}
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {problem.description}
                  </p>
                  
                  {problem.examples.length > 0 && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Example:</h4>
                      <div className="font-mono text-sm">
                        <div className="text-gray-600">
                          Input: <span className="text-blue-600">{problem.examples[0].input}</span>
                        </div>
                        <div className="text-gray-600">
                          Output: <span className="text-green-600">{problem.examples[0].output}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="ml-4 flex flex-col items-end">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    {isSolved ? 'Review' : 'Solve'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProblemList;