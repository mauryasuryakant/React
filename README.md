# React Workspace

This repository contains a small React app built with Vite and Tailwind CSS, along with a couple of older plain HTML/CSS/JS demo projects.

## Projects

### `PtsRj`
- A React + Vite application.
- Uses React `^19.2.6`, Vite `^8.0.12`, Tailwind CSS `^4.3.1`, and `@vitejs/plugin-react`.
- Includes a simple counter app in `PtsRj/src/App.jsx`.
- Configured with `PtsRj/vite.config.js` and Tailwind via `@tailwindcss/vite`.

### `oldSchool`
- A classic HTML/CSS/JavaScript demo.
- Contains `index.html`, `style.css`, and `script.js`.

### `try-project`
- Another simple HTML/CSS/JavaScript demo.
- Contains `index.html`, `style.css`, and `script.js`.

## Getting Started

To work with the React app in `PtsRj`:

```bash
cd PtsRj
npm install
npm run dev
```

Then open the local Vite development server URL shown in the terminal.

## Available Scripts

From `PtsRj`, use:

- `npm run dev` — start the development server
- `npm run build` — create a production build
- `npm run preview` — serve the production build locally
- `npm run lint` — run ESLint checks

## Workspace Structure

- `PtsRj/` — React app with Vite and Tailwind
- `PtsRj/package.json` — project dependencies and scripts
- `PtsRj/src/` — React source files
- `PtsRj/public/` — static assets
- `oldSchool/` — legacy HTML/CSS/JS example
- `try-project/` — simple HTML/CSS/JS example

## Notes

The root `README.md` provides a workspace-level introduction. For details specific to the React app, see `PtsRj/README.md`. If you want to make changes to the React app, start by editing `PtsRj/src/App.jsx`.
 