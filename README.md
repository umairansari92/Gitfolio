# Gitfolio

A modern GitHub profile viewer built with React and Vite.

## Features
- Search any GitHub username
- View profile info (avatar, name, bio, socials)
- See top languages (tech stack)
- View top repositories (by stars)
- See all public repositories
- GitHub stats (repos, followers, following, gists)
- Responsive design (mobile friendly)
- Accessible UI
- Error handling and input validation
- Loading spinner for data fetch

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm

### Installation
```bash
npm install
```

### Run Locally
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Folder Structure
```
src/
  components/GithubProfile.jsx   # Main profile viewer component
  hooks/useGithubProfile.js      # Custom hook for GitHub API
  api/github.js                  # API functions
  styles/dark.css                # Dark theme styles
  ...
public/
  vite.svg                      # Vite logo
```

## Customization
- Change the default username in `GithubProfile.jsx`.
- Update styles in `src/styles/dark.css`.

## Contributing
Pull requests are welcome! For major changes, please open an issue first.

## License
MIT

---
Made with ❤️ by umairansari92
