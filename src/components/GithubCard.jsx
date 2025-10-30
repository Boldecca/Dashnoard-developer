import React, { useEffect, useState } from 'react';

export default function GithubCard({ username = 'octocat' }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let abort = false;
    const fetchGitHubData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) throw new Error('User not found');
        const result = await response.json();
        if (!abort) setData(result);
      } catch (err) {
        if (!abort) setError(err.message || 'Failed to fetch GitHub data');
      } finally {
        if (!abort) setLoading(false);
      }
    };

    fetchGitHubData();
    return () => { abort = true; };
  }, [username]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-xl text-red-700 dark:text-red-300">{error}</div>;
  if (!data) return null;

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border dark:border-gray-700">
      <div className="flex items-center gap-4">
        <img src={data.avatar_url} alt={data.login} className="w-20 h-20 rounded-full object-cover" />
        <div>
          <div className="font-semibold text-lg dark:text-white">{data.name || data.login}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">@{data.login}</div>
        </div>
      </div>
    </div>
  );
}
