import { useState, useEffect } from 'react';
import { supabase, ProblemProgress } from '../lib/supabase';
import { User } from '@supabase/supabase-js';

export const useProgress = (user: User | null) => {
  const [progress, setProgress] = useState<ProblemProgress[]>([]);
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
        .from('problem_progress')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      setProgress(data || []);
    } catch (error) {
      console.error('Error fetching progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProgress = async (
    problemId: string,
    category: string,
    solved: boolean,
    solution: string
  ) => {
    if (!user) return;

    try {
      const existingProgress = progress.find(p => p.problem_id === problemId);

      if (existingProgress) {
        const { error } = await supabase
          .from('problem_progress')
          .update({
            solved,
            attempts: existingProgress.attempts + 1,
            last_solution: solution,
            solved_at: solved ? new Date().toISOString() : existingProgress.solved_at,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingProgress.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('problem_progress')
          .insert({
            user_id: user.id,
            problem_id: problemId,
            category,
            solved,
            attempts: 1,
            last_solution: solution,
            solved_at: solved ? new Date().toISOString() : null
          });

        if (error) throw error;
      }

      await fetchProgress();
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  const getProblemProgress = (problemId: string) => {
    return progress.find(p => p.problem_id === problemId);
  };

  const getSolvedCount = () => {
    return progress.filter(p => p.solved).length;
  };

  const getCategoryProgress = (category: string) => {
    const categoryProgress = progress.filter(p => p.category === category);
    return {
      solved: categoryProgress.filter(p => p.solved).length,
      total: categoryProgress.length
    };
  };

  return {
    progress,
    loading,
    updateProgress,
    getProblemProgress,
    getSolvedCount,
    getCategoryProgress,
    fetchProgress
  };
};