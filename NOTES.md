# 🦫 Project Diary: Damn Beavers

This document serves as a dev log and scratchpad for the **Damn Beavers** project.

## 🪵 Log Entries

### 2026-01-26
*   **UI**: Implemented a modern, responsive three-column layout in `Home.tsx` using Tailwind CSS.
*   **UI**: Added an AppBar with project title, subtitle, and live resource counters.
*   **UI**: Moved Dev Controls to the left column and arranged buttons in a row for better space utilization.
*   **UI**: Added an "Activity Log" placeholder in the right column.
*   **Testing**: Updated `Home.test.tsx` to reflect UI changes and added `data-testid` attributes to resource counters for more reliable testing.

### 2026-01-26
*   **Store**: Converted `beavers` in `useBeaverStore` from a `number` to an array of `Beaver` objects, each with `name`, `age`, and `health`.
*   **Store**: Added a `BERRY_CONSUMPTION_PER_SECOND` constant to `useBeaverStore`.
*   **Testing**: Updated tests in `useBeaverStore.test.ts` to reflect the new state structure.

### 2026-01-26
*   **UI**: Added a "Dev Controls" section to the `Home` page.
*   **Feature**: Implemented a "Reset Berries" button within the dev controls to reset the berry count to zero.

### 2026-01-26
*   **Store**: Added a `reset` method to `useBerryStore` to set the berry count to zero.
*   **Testing**: Fixed a state leakage issue in `useBerryStore.test.ts` by adding an `afterEach` hook to reset the store's state, ensuring each test runs in isolation.

### 2026-01-26
*   **State Management**: Implemented `useBerryStore` using **Zustand** with persistence middleware.
*   **Testing**: Fixed `TypeError: storage.setItem is not a function` in Vitest by mocking `localStorage` in `src/setupTests.ts`. This ensures that Zustand's `persist` middleware works correctly in the `jsdom` environment.

### 2026-01-25
*   **Documentation**: Added a new "Directory Structure" section to the `README.md` file. The section includes a tree view of the `src` directory and a detailed explanation of each subdirectory's purpose.

### 2026-01-24
*   **Project Kickoff**:
    *   The project concept and initial text for `README.md` were generated using **Gemini Canvas**.
    *   Converted the plain text `README.md` into structured Markdown.
    *   Initialized this `NOTES.md` file to track progress and decisions.
    *   Created `DEV.md` to document the project setup, dependencies, and build instructions.
    *   **Troubleshooting**: Encountered an issue with `npx tailwindcss init` due to a version mismatch (Tailwind v4 vs v3 workflow). Downgraded to Tailwind v3.4.17 to ensure compatibility with standard init commands.
    *   Successfully configured Vite, React, TypeScript, Tailwind CSS, and Lucide React.
    *   Created a basic UI shell in `App.tsx` to verify the stack.
    *   Set up testing environment with **Vitest**, **React Testing Library**, and **jsdom**.
    *   Verified setup with initial tests in `src/test/App.test.tsx`.

## 🧠 Backlog & Ideas
*   [x] Set up React + Vite environment.
*   [x] Configure Tailwind CSS customization (colors, fonts).
*   [ ] Implement basic resource ticking loop (Wood, Mud, Berries (blackberries)).
*   [ ] Sketch out UI layout for the three-column dashboard.

## 🔗 References
*   **Inspiration**: Kittens Game, Universal Paperclips.
*   **Tech Stack**: React, Vite, TypeScript, Zustand, Tailwind CSS.
