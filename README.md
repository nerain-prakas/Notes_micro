# AngularJS Notes Micro App

A simple note-taking application built with AngularJS 1.8.x that allows you to create, edit, and organize notes with features like pinning, favoriting, and color themes.

## Features

- Create, edit, and delete notes
- Pin important notes to the top
- Mark notes as favorites
- Color-code notes from a preset palette
- Light/dark theme support
- Instant search functionality
- Sort notes by update time, creation time, or title
- Keyboard shortcuts
- Persists data to localStorage

## Keyboard Shortcuts

- `n` - Create new note
- `/` - Focus search
- `Esc` - Close dialogs/editors

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open http://localhost:5173 in your browser

## Structure

- `index.html` - Main entry point
- `app.module.js` - Main Angular module and app controller
- `app.routes.js` - Route configuration
- `services/notes.service.js` - Notes data service with localStorage
- `controllers/notes.controller.js` - Notes list controller
- `components/` - Reusable components and their controllers
- `styles/main.css` - Application styles with theme support

## Development

- Format code:
  ```bash
  npm run format
  ```

- Build for production:
  ```bash
  npm run build
  ```

## Storage

Notes are stored in localStorage under the 'notes' key. To reset all data:

```javascript
localStorage.removeItem('notes');
location.reload();
```

## Theme

Toggle between light and dark theme using the theme button in the header. Theme preference is persisted in localStorage.