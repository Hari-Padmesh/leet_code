import { Problem } from '../App';

const problems: { [category: string]: Problem[] } = {
  warmup: [
    {
      id: 'warmup-1',
      title: 'sleepIn',
      description: 'The parameter weekday is True if it is a weekday, and the parameter vacation is True if we are on vacation. We sleep in if it is not a weekday or we\'re on vacation. Return True if we sleep in.',
      examples: [
        { input: 'sleepIn(False, False)', output: 'True' },
        { input: 'sleepIn(True, False)', output: 'False' },
        { input: 'sleepIn(False, True)', output: 'True' }
      ],
      testCases: [
        { input: 'sleepIn(False, False)', expected: 'True' },
        { input: 'sleepIn(True, False)', expected: 'False' },
        { input: 'sleepIn(False, True)', expected: 'True' },
        { input: 'sleepIn(True, True)', expected: 'True' }
      ],
      difficulty: 'easy',
      category: 'warmup',
      functionSignature: 'def sleepIn(weekday, vacation):',
      solved: false
    },
    {
      id: 'warmup-2',
      title: 'monkeyTrouble',
      description: 'We have two monkeys, a and b, and the parameters aSmile and bSmile indicate if each is smiling. We are in trouble if they are both smiling or if neither of them is smiling. Return True if we are in trouble.',
      examples: [
        { input: 'monkeyTrouble(True, True)', output: 'True' },
        { input: 'monkeyTrouble(False, False)', output: 'True' },
        { input: 'monkeyTrouble(True, False)', output: 'False' }
      ],
      testCases: [
        { input: 'monkeyTrouble(True, True)', expected: 'True' },
        { input: 'monkeyTrouble(False, False)', expected: 'True' },
        { input: 'monkeyTrouble(True, False)', expected: 'False' },
        { input: 'monkeyTrouble(False, True)', expected: 'False' }
      ],
      difficulty: 'easy',
      category: 'warmup',
      functionSignature: 'def monkeyTrouble(aSmile, bSmile):',
      solved: false
    },
    {
      id: 'warmup-3',
      title: 'sumDouble',
      description: 'Given two int values, return their sum. However, if the two values are the same, then return double their sum.',
      examples: [
        { input: 'sumDouble(1, 2)', output: '3' },
        { input: 'sumDouble(3, 2)', output: '5' },
        { input: 'sumDouble(2, 2)', output: '8' }
      ],
      testCases: [
        { input: 'sumDouble(1, 2)', expected: '3' },
        { input: 'sumDouble(3, 2)', expected: '5' },
        { input: 'sumDouble(2, 2)', expected: '8' },
        { input: 'sumDouble(-1, 0)', expected: '-1' }
      ],
      difficulty: 'easy',
      category: 'warmup',
      functionSignature: 'def sumDouble(a, b):',
      solved: false
    }
  ],
  
  string: [
    {
      id: 'string-1',
      title: 'helloName',
      description: 'Given a string name, e.g. "Bob", return a greeting of the form "Hello Bob!".',
      examples: [
        { input: 'helloName("Bob")', output: '"Hello Bob!"' },
        { input: 'helloName("Alice")', output: '"Hello Alice!"' },
        { input: 'helloName("X")', output: '"Hello X!"' }
      ],
      testCases: [
        { input: 'helloName("Bob")', expected: '"Hello Bob!"' },
        { input: 'helloName("Alice")', expected: '"Hello Alice!"' },
        { input: 'helloName("X")', expected: '"Hello X!"' },
        { input: 'helloName("Dolly")', expected: '"Hello Dolly!"' }
      ],
      difficulty: 'easy',
      category: 'string',
      functionSignature: 'def helloName(name):',
      solved: false
    },
    {
      id: 'string-2',
      title: 'makeAbba',
      description: 'Given two strings, a and b, return the result of putting them together in the order abba, e.g. "Hi" and "Bye" returns "HiByeByeHi".',
      examples: [
        { input: 'makeAbba("Hi", "Bye")', output: '"HiByeByeHi"' },
        { input: 'makeAbba("Yo", "Alice")', output: '"YoAliceAliceYo"' },
        { input: 'makeAbba("What", "Up")', output: '"WhatUpUpWhat"' }
      ],
      testCases: [
        { input: 'makeAbba("Hi", "Bye")', expected: '"HiByeByeHi"' },
        { input: 'makeAbba("Yo", "Alice")', expected: '"YoAliceAliceYo"' },
        { input: 'makeAbba("What", "Up")', expected: '"WhatUpUpWhat"' },
        { input: 'makeAbba("aaa", "bbb")', expected: '"aaabbbbbbaaa"' }
      ],
      difficulty: 'easy',
      category: 'string',
      functionSignature: 'def makeAbba(a, b):',
      solved: false
    }
  ],
  
  array: [
    {
      id: 'array-1',
      title: 'firstLast6',
      description: 'Given an array of ints, return True if 6 appears as either the first or last element in the array. The array will be length 1 or more.',
      examples: [
        { input: 'firstLast6([1, 2, 6])', output: 'True' },
        { input: 'firstLast6([6, 1, 2, 3])', output: 'True' },
        { input: 'firstLast6([13, 6, 1, 2, 3])', output: 'False' }
      ],
      testCases: [
        { input: 'firstLast6([1, 2, 6])', expected: 'True' },
        { input: 'firstLast6([6, 1, 2, 3])', expected: 'True' },
        { input: 'firstLast6([13, 6, 1, 2, 3])', expected: 'False' },
        { input: 'firstLast6([6])', expected: 'True' }
      ],
      difficulty: 'easy',
      category: 'array',
      functionSignature: 'def firstLast6(nums):',
      solved: false
    },
    {
      id: 'array-2',
      title: 'sameFirstLast',
      description: 'Given an array of ints, return True if the array is length 1 or more, and the first element and the last element are equal.',
      examples: [
        { input: 'sameFirstLast([1, 2, 3])', output: 'False' },
        { input: 'sameFirstLast([1, 2, 3, 1])', output: 'True' },
        { input: 'sameFirstLast([1, 2, 1])', output: 'True' }
      ],
      testCases: [
        { input: 'sameFirstLast([1, 2, 3])', expected: 'False' },
        { input: 'sameFirstLast([1, 2, 3, 1])', expected: 'True' },
        { input: 'sameFirstLast([1, 2, 1])', expected: 'True' },
        { input: 'sameFirstLast([7])', expected: 'True' }
      ],
      difficulty: 'easy',
      category: 'array',
      functionSignature: 'def sameFirstLast(nums):',
      solved: false
    }
  ],
  
  logic: [
    {
      id: 'logic-1',
      title: 'cigarParty',
      description: 'When squirrels get together for a party, they like to have cigars. A squirrel party is successful when the number of cigars is between 40 and 60, inclusive. Unless it is the weekend, in which case there is no upper bound on the number of cigars. Return True if the party is successful.',
      examples: [
        { input: 'cigarParty(30, False)', output: 'False' },
        { input: 'cigarParty(50, False)', output: 'True' },
        { input: 'cigarParty(70, True)', output: 'True' }
      ],
      testCases: [
        { input: 'cigarParty(30, False)', expected: 'False' },
        { input: 'cigarParty(50, False)', expected: 'True' },
        { input: 'cigarParty(70, True)', expected: 'True' },
        { input: 'cigarParty(60, False)', expected: 'True' }
      ],
      difficulty: 'medium',
      category: 'logic',
      functionSignature: 'def cigarParty(cigars, isWeekend):',
      solved: false
    }
  ],
  
  loops: [
    {
      id: 'loops-1',
      title: 'stringTimes',
      description: 'Given a string and a non-negative int n, return a larger string that is n copies of the original string.',
      examples: [
        { input: 'stringTimes("Hi", 2)', output: '"HiHi"' },
        { input: 'stringTimes("Hi", 3)', output: '"HiHiHi"' },
        { input: 'stringTimes("Hi", 1)', output: '"Hi"' }
      ],
      testCases: [
        { input: 'stringTimes("Hi", 2)', expected: '"HiHi"' },
        { input: 'stringTimes("Hi", 3)', expected: '"HiHiHi"' },
        { input: 'stringTimes("Hi", 1)', expected: '"Hi"' },
        { input: 'stringTimes("Oh Boy!", 0)', expected: '""' }
      ],
      difficulty: 'easy',
      category: 'loops',
      functionSignature: 'def stringTimes(str, n):',
      solved: false
    }
  ],
  
  math: [
    {
      id: 'math-1',
      title: 'diff21',
      description: 'Given an int n, return the absolute difference between n and 21, except return double the absolute difference if n is over 21.',
      examples: [
        { input: 'diff21(19)', output: '2' },
        { input: 'diff21(10)', output: '11' },
        { input: 'diff21(22)', output: '2' }
      ],
      testCases: [
        { input: 'diff21(19)', expected: '2' },
        { input: 'diff21(10)', expected: '11' },
        { input: 'diff21(22)', expected: '2' },
        { input: 'diff21(25)', expected: '8' }
      ],
      difficulty: 'easy',
      category: 'math',
      functionSignature: 'def diff21(n):',
      solved: false
    }
  ]
};

export const getProblemsForCategory = (category: string): Problem[] => {
  return problems[category] || [];
};

export const getAllProblems = (): Problem[] => {
  return Object.values(problems).flat();
};