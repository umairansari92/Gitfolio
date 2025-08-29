import { useState, useEffect } from 'react';
import githubAPI from '../api/github';

export default function useGithubProfile(username) {
  const [state, setState] = useState({
    profile: null,
    repos: [],
    loading: false,
    error: null,
  });

  useEffect(() => {
    if (!username) return;

    const fetchData = async () => {
      setState(prev => ({ ...prev, loading: true, error: null }));

      try {
        const [profileRes, reposRes] = await Promise.all([
          githubAPI.get(`/users/${username}`),
          githubAPI.get(`/users/${username}/repos?per_page=200`),
        ]);

        const repos = Array.isArray(reposRes.data)
          ? reposRes.data.sort((a, b) => b.stargazers_count - a.stargazers_count)
          : [];

        setState({ profile: profileRes.data, repos, loading: false, error: null });
      } catch (err) {
        setState({ profile: null, repos: [], loading: false, error: err.message });
      }
    };

    fetchData();
  }, [username]);

  return state;
}
