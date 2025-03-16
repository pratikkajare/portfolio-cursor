'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface GitHubStats {
  public_repos: number;
  followers: number;
  following: number;
  total_stars: number;
  total_forks: number;
  languages: Record<string, number>;
  top_repos: Array<{
    name: string;
    description: string | null;
    stars: number;
    forks: number;
    url: string;
  }>;
  last_updated: string;
}

export default function GitHubStats() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        // Try to fetch from our local JSON file first
        const response = await fetch('/data/github_stats.json');

        // If the file doesn't exist, we'll get a 404
        if (!response.ok) {
          // Fallback to fetching directly from GitHub API
          const apiResponse = await fetch('https://api.github.com/users/pratikkajare');
          const userData = await apiResponse.json();

          const reposResponse = await fetch('https://api.github.com/users/pratikkajare/repos?per_page=100');
          const reposData = await reposResponse.json();

          // Create a simplified stats object
          const fallbackStats: GitHubStats = {
            public_repos: userData.public_repos || 0,
            followers: userData.followers || 0,
            following: userData.following || 0,
            total_stars: 0,
            total_forks: 0,
            languages: {},
            top_repos: [],
            last_updated: new Date().toISOString()
          };

          // Calculate stars and forks
          if (Array.isArray(reposData)) {
            fallbackStats.total_stars = reposData.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);
            fallbackStats.total_forks = reposData.reduce((sum, repo) => sum + (repo.forks_count || 0), 0);

            // Count languages
            reposData.forEach(repo => {
              if (repo.language) {
                fallbackStats.languages[repo.language] = (fallbackStats.languages[repo.language] || 0) + 1;
              }
            });

            // Get top repos
            const topRepos = [...reposData].sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0)).slice(0, 5);
            fallbackStats.top_repos = topRepos.map(repo => ({
              name: repo.name,
              description: repo.description,
              stars: repo.stargazers_count || 0,
              forks: repo.forks_count || 0,
              url: repo.html_url
            }));
          }

          setStats(fallbackStats);
        } else {
          // If we have the local file, use that
          const data = await response.json();
          setStats(data);
        }
      } catch (err) {
        console.error('Error fetching GitHub stats:', err);
        setError('Failed to load GitHub stats');
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  if (!stats) {
    return <div className="text-center py-10">No GitHub stats available</div>;
  }

  // Get top languages (up to 5)
  const topLanguages = Object.entries(stats.languages)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="py-10">
      <h3 className="text-2xl font-bold mb-8 text-center">GitHub Stats</h3>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Repositories', value: stats.public_repos, icon: '📁' },
          { label: 'Stars', value: stats.total_stars, icon: '⭐' },
          { label: 'Forks', value: stats.total_forks, icon: '🍴' },
          { label: 'Followers', value: stats.followers, icon: '👥' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md text-center"
          >
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Top Languages */}
      {topLanguages.length > 0 && (
        <div className="mb-10">
          <h4 className="text-xl font-semibold mb-4">Top Languages</h4>
          <div className="flex flex-wrap gap-3">
            {topLanguages.map(([language, count], index) => (
              <motion.div
                key={language}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-full"
              >
                {language} ({count})
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Top Repositories */}
      {stats.top_repos.length > 0 && (
        <div>
          <h4 className="text-xl font-semibold mb-4">Top Repositories</h4>
          <div className="space-y-4">
            {stats.top_repos.map((repo, index) => (
              <motion.div
                key={repo.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md"
              >
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-green-500 hover:text-green-600 transition-colors"
                >
                  {repo.name}
                </a>
                {repo.description && (
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">{repo.description}</p>
                )}
                <div className="flex gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                  <span>⭐ {repo.stars}</span>
                  <span>🍴 {repo.forks}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <div className="text-xs text-gray-500 dark:text-gray-400 text-center mt-8">
        Last updated: {new Date(stats.last_updated).toLocaleDateString()}
      </div>
    </div>
  );
}