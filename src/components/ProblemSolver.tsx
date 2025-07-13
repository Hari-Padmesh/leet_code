import React, { useState } from 'react';
import { Play, CheckCircle, XCircle, ArrowLeft, RotateCcw } from 'lucide-react';
import { Problem } from '../App';

interface ProblemSolverProps {
  problem: Problem;
  onSolved: (problemId: string) => void;
  onBack: () => void;
  getProblemProgress: (problemId: string) => any;
  updateProgress: (problemId: string, solved: boolean, solutionCode?: string) => void;
}

const ProblemSolver: React.FC<ProblemSolverProps> = ({ 
  problem, 
  onSolved, 
  onBack, 
  getProblemProgress, 
  updateProgress 
}) => {
  const progress = getProblemProgress(problem.id);
  const [code, setCode] = useState(
    progress?.solutionCode || problem.functionSignature + '\n    # Your code here\n    pass'
  );
  const [testResults, setTestResults] = useState<Array<{ passed: boolean; input: string; expected: string; actual: string }>>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [allTestsPassed, setAllTestsPassed] = useState(false);

  const runTests = () => {
    setIsRunning(true);
    
    // Simulate test execution
    setTimeout(() => {
      const results = problem.testCases.map((testCase, index) => {
        // Simple simulation - in a real app, you'd execute the code
        const passed = Math.random() > 0.3; // Simulate some tests passing
        return {
          passed,
          input: testCase.input,
          expected: testCase.expected,
          actual: passed ? testCase.expected : 'incorrect result'
        };
      });
      
      setTestResults(results);
      const allPassed = results.every(r => r.passed);
      setAllTestsPassed(allPassed);
      setIsRunning(false);
      
      if (allPassed) {
        updateProgress(problem.id, true, code);
        setTimeout(() => onSolved(problem.id), 1500);
      } else {
        // Save progress even if not all tests pass
        updateProgress(problem.id, false, code);
      }
    }, 1000);
  };

  const resetCode = () => {
    const defaultCode = problem.functionSignature + '\n    # Your code here\n    pass';
    setCode(defaultCode);
    updateProgress(problem.id, false, defaultCode);
    setTestResults([]);
    setAllTestsPassed(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">
      {/* Problem Description */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Problems</span>
          </button>
          
          <div className="flex items-center space-x-3">
            {progress?.solved && (
              <div className="flex items-center space-x-1 text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Solved</span>
              </div>
            )}
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(problem.difficulty)}`}>
              {problem.difficulty}
            </span>
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{problem.title}</h1>
          <p className="text-gray-700 leading-relaxed mb-6">{problem.description}</p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Examples</h3>
          {problem.examples.map((example, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <div className="font-mono text-sm space-y-1">
                <div className="text-gray-600">
                  Input: <span className="text-blue-600">{example.input}</span>
                </div>
                <div className="text-gray-600">
                  Output: <span className="text-green-600">{example.output}</span>
                </div>
                {example.explanation && (
                  <div className="text-gray-500 mt-2">{example.explanation}</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {testResults.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Test Results</h3>
            <div className="space-y-2">
              {testResults.map((result, index) => (
                <div key={index} className={`p-3 rounded-lg border ${
                  result.passed ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                }`}>
                  <div className="flex items-center space-x-2 mb-2">
                    {result.passed ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-600" />
                    )}
                    <span className="font-medium">Test {index + 1}</span>
                  </div>
                  <div className="font-mono text-sm space-y-1">
                    <div>Input: {result.input}</div>
                    <div>Expected: {result.expected}</div>
                    {!result.passed && <div>Actual: {result.actual}</div>}
                  </div>
                </div>
              ))}
            </div>
            
            {allTestsPassed && (
              <div className="bg-green-100 border border-green-300 rounded-lg p-4 text-center">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-green-800">Congratulations!</h3>
                <p className="text-green-700">All tests passed. Problem solved successfully!</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Code Editor */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">Your Solution</h3>
          <div className="flex space-x-2">
            <button
              onClick={resetCode}
              className="flex items-center space-x-1 px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset</span>
            </button>
            <button
              onClick={runTests}
              disabled={isRunning}
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
            >
              <Play className="w-4 h-4" />
              <span>{isRunning ? 'Running...' : 'Run Tests'}</span>
            </button>
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-4">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-64 bg-transparent text-green-400 font-mono text-sm resize-none outline-none"
            placeholder="Write your solution here..."
            spellCheck={false}
          />
        </div>

        <div className="text-sm text-gray-600">
          <p>• Write your solution in the code editor above</p>
          <p>• Click "Run Tests" to check your solution</p>
          <p>• All test cases must pass to complete the problem</p>
        </div>
      </div>
    </div>
  );
};

export default ProblemSolver;