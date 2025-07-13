import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface UserProgress {
  problemId: string;
  solved: boolean;
  solutionCode?: string;
  solvedAt?: string;
}

export const useProgress = () => {
  const { user } = useAuth();
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProgress();
    } else {
      setProgress([]);
      setLoading(false);
    }
  }, [user]);

  const fetchProgress = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;

      const progressMap = data.map(item => ({
        problemId: item.problem_id,
        solved: item.solved,
        solutionCode: item.solution_code || undefined,
        solvedAt: item.solved_at || undefined,
      }));

      setProgress(progressMap);
    } catch (error) {
      console.error('Error fetching progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProgress = async (problemId: string, solved: boolean, solutionCode?: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: user.id,
          problem_id: problemId,
          solved,
          solution_code: solutionCode || null,
          solved_at: solved ? new Date().toISOString() : null,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;

      // Update local state
      setProgress(prev => {
        const existing = prev.find(p => p.problemId === problemId);
        if (existing) {
          return prev.map(p => 
            p.problemId === problemId 
              ? { ...p, solved, solutionCode, solvedAt: solved ? new Date().toISOString() : undefined }
              : p
          );
        } else {
          return [...prev, { 
            problemId, 
            solved, 
            solutionCode, 
            solvedAt: solved ? new Date().toISOString() : undefined 
          }];
        }
      });
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  const getProblemProgress = (problemId: string) => {
    return progress.find(p => p.problemId === problemId);
  };

  const getSolvedCount = () => {
    return progress.filter(p => p.solved).length;
  };

  return {
    progress,
    loading,
    updateProgress,
    getProblemProgress,
    getSolvedCount,
    refetch: fetchProgress,
  };
};