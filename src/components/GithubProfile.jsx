import React, { useState, useMemo } from "react";
import useGithubProfile from "../hooks/useGithubProfile";
import "../styles/dark.css";


export default function GithubProfile() {
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("umairansari92");
  const { profile, repos, loading, error } = useGithubProfile(username);

  const topLanguages = useMemo(() => {
    const tally = {};
    repos.forEach(r => r.language && (tally[r.language] = (tally[r.language] || 0) + 1));
    return Object.entries(tally)
      .map(([lang, count]) => ({ lang, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
  }, [repos]);

  const topRepos = repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count) // top by stars
    .slice(0, 6);

  const [inputError, setInputError] = useState("");
  // ...existing code...

  const handleSearch = (e) => {
    e.preventDefault();
    const val = input.trim();
    // Input validation: prevent empty or invalid usernames
    if (!val) {
      setInputError("Please enter a GitHub username.");
      return;
    }
    if (!/^[a-zA-Z0-9-]+$/.test(val)) {
      setInputError("Invalid username. Only letters, numbers, and hyphens allowed.");
      return;
    }
    setUsername(val);
    setInput("");
    setInputError("");
  };

  // Socials extraction
  const socials = [];
  if (profile) {
    if (profile.twitter_username) {
      socials.push({
        name: "Twitter",
        url: `https://twitter.com/${profile.twitter_username}`,
        icon: "🐦"
      });
    }
    if (profile.blog && profile.blog.startsWith("http")) {
      socials.push({
        name: "Blog",
        url: profile.blog,
        icon: "📝"
      });
    }
    if (profile.html_url) {
      socials.push({
        name: "GitHub",
        url: profile.html_url,
        icon: "🌐"
      });
    }
    if (profile.company) {
      socials.push({
        name: "Company",
        url: `https://github.com/${profile.company.replace('@','')}`,
        icon: "🏢"
      });
    }
  }

  return (
    <div className="container">
      {/* header */}
      <div className="header row">
        <h1 className="title">GitHub Profile</h1>
      </div>

  {/* Removed Random Dev Quote */}

      {/* search */}
      <form onSubmit={handleSearch} className="row mb-4" style={{ gap: 10 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="GitHub username"
          className="input"
          aria-label="GitHub username"
        />
        <button type="submit" className="btn" aria-label="Search GitHub username">Search</button>
      </form>
      {inputError && <div className="error" style={{ marginBottom: 8 }}>{inputError}</div>}

      {/* states */}
      {loading && (
        <div className="spinner-wrap">
          <div className="spinner" aria-label="Loading"></div>
          <span className="muted">Loading...</span>
        </div>
      )}
      {error && (
        <div className="error">
          {error.includes("404") ? "User not found. Please check the username." :
           error.includes("rate limit") ? "API rate limit exceeded. Please try again later." :
           error}
        </div>
      )}

      {/* profile */}
      {profile && (
        <section className="stack gap-8">
          {/* About Me */}
          <div className="card pad">
            <div className="row" style={{ gap: 16, flexWrap: 'wrap' }}>
              <img src={profile.avatar_url} alt="avatar" className="avatar" />
              <div>
                <div className="row" style={{ gap: 8, flexWrap: 'wrap' }}>
                  <h2 className="repo-title" style={{ fontSize: 20 }}>{profile.name || profile.login}</h2>
                  <span className="handle">@{profile.login}</span>
                </div>
                {/* 💫 About Me */}
                <div style={{ marginTop: 6 }}>
                  <span role="img" aria-label="about">💫</span> <b>About Me:</b>
                  {profile.bio ? <p className="bio">{profile.bio}</p> : <span className="muted">No bio provided.</span>}
                </div>
                {/* 🌐 Socials */}
                
              </div>
            </div>
          </div>

          {/* 📊 GitHub Stats */}
          <div className="card pad">
            <h3 className="mb-3">📊 GitHub Stats:</h3>
            <div className="row" style={{ gap: 18 }}>
              <span>Repos: <b>{profile.public_repos}</b></span>
              <span>Followers: <b>{profile.followers}</b></span>
              <span>Following: <b>{profile.following}</b></span>
              <span>Gists: <b>{profile.public_gists}</b></span>
            </div>
          </div>

          {/* 💻 Tech Stack */}
          <div className="card pad">
            <h3 className="mb-3">💻 Tech Stack:</h3>
            <div className="badges">
              {topLanguages.length > 0 ? topLanguages.map(l => (
                <span key={l.lang} className="badge">{l.lang}</span>
              )) : <span className="muted">No languages detected from public repos.</span>}
            </div>
          </div>


          {/* PinnedLoading (spinner for top repos) */}
          <div className="card pad">
            <h3 className="mb-3">📌 Pinned Repositories</h3>
            {loading ? (
              <div className="spinner-wrap"><div className="spinner" aria-label="PinnedLoading"></div> <span className="muted">Loading pinned repos...</span></div>
            ) : topRepos.length === 0 ? (
              <div className="muted">No public repositories found.</div>
            ) : (
              <div className="repo-grid">
                {topRepos.map(r => (
                  <a key={r.id} href={r.html_url} target="_blank" rel="noreferrer" className="repo">
                    <div className="row" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <div className="repo-title">{r.name}</div>
                        {r.description && <div className="repo-desc">{r.description}</div>}
                        <div className="muted text-xs mt-1">
                          Last updated: {new Date(r.updated_at).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="repo-meta">
                        <div>⭐ {r.stargazers_count}</div>
                        <div>🍴 {r.forks_count}</div>
                        <div>👁 {r.watchers_count}</div>
                        <div>{r.language || "—"}</div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* all repos */}
          <div className="card pad">
            <h3 className="mb-2">All Public Repos</h3>
            <div className="list-wrap">
              <ul className="list">
                {repos.map(r => (
                  <li key={r.id} className="row" style={{ justifyContent: "space-between" }}>
                    <div>
                      <a href={r.html_url} target="_blank" rel="noreferrer">{r.name}</a>
                      <div className="muted text-xs">
                        ⭐ {r.stargazers_count} • 🍴 {r.forks_count} • {r.language || "—"}
                      </div>
                    </div>
                    <div className="muted text-xs">
                      Updated: {new Date(r.updated_at).toLocaleDateString()}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {!profile && !loading && !error && (
        <div className="muted">Search a GitHub username above or use the default sample.</div>
      )}
    </div>
  );
}
