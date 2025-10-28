import React, { useEffect, useState } from 'react';

export default function GitHubCard({ isDarkMode }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const username = 'boldecca';

  useEffect(() => {
    const fetchGitHubData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) throw new Error('GitHub user not found');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchGitHubData();
  }, []);

  if (loading) {
    return (
      <div className={`rounded-xl shadow-lg p-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} transition-colors duration-300`}>
        <div className="flex items-center justify-center h-64">
          <span className="animate-spin text-blue-500 text-xl">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`rounded-xl shadow-lg p-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} transition-colors duration-300`}>
        <div className="flex items-center justify-center h-64">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className={`rounded-xl shadow-lg p-6 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} transition-colors duration-300 hover:shadow-xl`}>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">👤 GitHub Profile</h2>

      <div className="flex flex-col items-center mb-4">
        <img
          src={data.avatar_url}
          alt={data.name || data.login}
          className="w-28 h-28 rounded-full border-2 border-blue-500 mb-3 shadow-md"
        />
        <h3 className="text-xl font-semibold">{data.name || data.login}</h3>
        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>@{data.login}</p>
      </div>

      <div className="grid grid-rows-3 gap-4 mb-4 text-center">
        <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <p className="text-lg font-bold text-blue-500">{data.public_repos}</p>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Repos</p>
        </div>
        <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <p className="text-lg font-bold text-green-500">{data.followers}</p>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Followers</p>
        </div>
        <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <p className="text-lg font-bold text-purple-500">{data.following}</p>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Following</p>
        </div>
      </div>

      <div className={`space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} text-center`}>
        {data.location && <p>📍 {data.location}</p>}
        {data.blog && (
          <p>
            🔗{' '}
            <a
              href={data.blog.startsWith('http') ? data.blog : `https://${data.blog}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {data.blog}
            </a>
          </p>
        )}
        {!data.location && !data.blog && <p>GitHub User</p>}
      </div>
    </div>
  );
}
