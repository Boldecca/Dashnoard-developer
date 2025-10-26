import React, { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

export default function GitHubCard({ username }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(Boolean(username));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username) return setData(null);
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(`https://api.github.com/users/${encodeURIComponent(username)}`)
      .then(async (res) => {
        if (!res.ok) throw new Error(`GitHub API: ${res.status} ${res.statusText}`);
        return res.json();
      })
      .then((json) => { if (!cancelled) setData(json); })
      .catch((err) => { if (!cancelled) setError(err.message); })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => (cancelled = true);
  }, [username]);

  if (!username) {
    return (
      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border dark:border-gray-700">
        <div className="text-gray-600 dark:text-gray-300">Enter a GitHub username to load profile.</div>
      </div>
    );
  }

  if (loading) return <div className="p-6"><LoadingSpinner /></div>;
  if (error) return <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-xl text-red-700 dark:text-red-300">{error}</div>;

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border dark:border-gray-700">
      <div className="flex items-center gap-4">
        <img src={data.avatar_url} alt={data.login} className="w-20 h-20 rounded-full object-cover" />
        <div>
          <div className="font-semibold text-lg dark:text-white">{data.name || data.login}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">@{data.login}</div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-2xl font-bold dark:text-white">{data.public_repos}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Repos</div>
        </div>
        <div>
          <div className="text-2xl font-bold dark:text-white">{data.followers}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Followers</div>
        </div>
        <div>
          <div className="text-2xl font-bold dark:text-white">{data.following}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Following</div>
        </div>
      </div>

      <div className="mt-4 text-gray-600 dark:text-gray-300 text-sm">{data.bio}</div>

      <a href={data.html_url} target="_blank" rel="noreferrer" className="inline-block mt-4 text-sm text-blue-600 dark:text-blue-400">
        View on GitHub → 
      </a>
    </div>
  );
}
