# 🛠️ Developer Guide: Damn Beavers

This guide outlines the steps to invoke and set up the development environment for the **Damn Beavers** project.

## 🚀 Project Initialization

Since this is a fresh project, we will use **Vite** to scaffold the application with React and TypeScript.

### 1. Initialize Vite Project

Run the following command in the root directory to create the project files (this assumes the current directory is `damn-beavers` and is currently empty or just has documentation files).

```bash
# Initialize Vite with React + TypeScript template in the current directory
npm create vite@latest . -- --template react-ts
```

### 2. Install Dependencies

Install the core libraries required for state management and UI.

```bash
# Core dependencies
npm install zustand lucide-react

# Install dev dependencies (if not already handled by create vite)
npm install
```

### 3. Setup Tailwind CSS

Install Tailwind CSS and its peer dependencies, then generate the configuration files.

```bash
# Install Tailwind CSS, PostCSS, and Autoprefixer
npm install -D tailwindcss postcss autoprefixer

# Initialize Tailwind config
npx tailwindcss init -p
```

### 4. Configure Tailwind

Update `tailwind.config.js` to scan your source files:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Add the Tailwind directives to your main CSS file (usually `./src/index.css`):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 5. Start Development Server

```bash
npm run dev
```

## 📦 Dependency Overview

*   **Build Tool**: [Vite](https://vitejs.dev/) - Fast, modern frontend build tool.
*   **Framework**: [React](https://react.dev/) - UI library.
*   **Language**: [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript.
*   **State Management**: [Zustand](https://github.com/pmndrs/zustand) - Minimalist state management (simpler than Redux).
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework.
*   **Icons**: [Lucide React](https://lucide.dev/) - Consistent, clean icons.
