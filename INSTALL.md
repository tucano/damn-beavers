# Deploying to GitHub Pages

This guide provides instructions on how to publish the **Damn Beavers** React application (built with Vite) to GitHub Pages.

## Prerequisites

1.  **Node.js and npm** installed on your machine.
2.  A **GitHub account** and a repository for this project.
3.  The project source code pushed to your GitHub repository.

## Setup Procedure

### 1. Install the `gh-pages` package

Install the `gh-pages` package as a development dependency. This package will handle the creation and updating of the `gh-pages` branch.

```bash
npm install gh-pages --save-dev
```

### 2. Configure `package.json`

Open your `package.json` file and make the following changes:

1.  **Add a `homepage` property**:
    Add the `homepage` property at the top level. Replace `<username>` with your GitHub username and `<repo-name>` with your repository name (e.g., `damn-beavers`).

    ```json
    "homepage": "https://<username>.github.io/<repo-name>/",
    ```

2.  **Add deployment scripts**:
    Add `predeploy` and `deploy` scripts to the `"scripts"` object.

    ```json
    "scripts": {
      "dev": "vite",
      "build": "tsc -b && vite build",
      "lint": "eslint .",
      "preview": "vite preview",
      "test": "vitest",
      "predeploy": "npm run build",
      "deploy": "gh-pages -d dist"
    }
    ```

### 3. Configure `vite.config.ts`

Vite needs to know the base public path when served on GitHub Pages. Open `vite.config.ts` and add the `base` property to the configuration.

```typescript
// vite.config.ts
export default defineConfig({
  base: '/<repo-name>/', // Replace <repo-name> with your repository name
  plugins: [react()],
  // ... rest of the config
})
```

### 4. Deploy the Application

Run the following command to build and deploy your application:

```bash
npm run deploy
```

This command will:
1.  Run the `predeploy` script, which executes `npm run build` to create a production-ready `dist` folder.
2.  Run the `deploy` script, which uses `gh-pages` to push the contents of the `dist` folder to a new `gh-pages` branch in your repository.

### 5. Configure GitHub Repository Settings

1.  Navigate to your repository on GitHub.
2.  Click on the **Settings** tab.
3.  In the left sidebar, under **Code and automation**, click on **Pages**.
4.  Under **Build and deployment** > **Source**, ensure "Deploy from a branch" is selected.
5.  Under **Branch**, select `gh-pages` and the `/(root)` folder.
6.  Click **Save**.

## Accessing Your App

Once the GitHub Actions background process finishes (you can track it in the **Actions** tab), your application will be available at:

`https://<username>.github.io/<repo-name>/`

---
*Reference: This guide is based on the [react-gh-pages](https://github.com/gitname/react-gh-pages) tutorial.*
