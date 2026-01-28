# 🦫 Project Diary: Damn Beavers

This document serves as a dev log and scratchpad for the **Damn Beavers** project.

## 🪵 Log Entries

### 2026-01-28
*   **UI**: Added a "**100x Speed**" dev control to accelerate game time for testing purposes.
*   **Store**: Updated `useTimeStore` with `timeMultiplier` and `setTimeMultiplier` action.
*   **Hook**: Modified `useGameTime` hook to adjust `setInterval` delay based on the `timeMultiplier`.
*   **Store**: Implemented yearly beaver aging in `useBeaverStore`. Beavers now age by 1 every 365 days (defined by `DAYS_IN_YEAR`).
*   **Feature**: Beavers no longer age every day; aging is now synchronized with the game year cycle.

### 2026-01-26
*   **UI**: Created `BeaverList` component to display names, ages, and health bars of the beaver colony in the left column.
*   **Testing**: Added unit tests for `BeaverList` and updated `Home.test.tsx` to handle new UI components and icon mocks.

### 2026-01-26
*   **Store**: Implemented `useTimeStore` to track game time in days and manage pause state.
*   **Util**: Created `gameTimeHelper.ts` to format game days into "Year - Season - Day" strings using custom season lengths (Winter: 90, Spring: 92, Summer: 92, Autumn: 91).
*   **Config**: Added time-related constants to `src/config/game.ts`.
*   **UI**: Added game time display and Pause/Play toggle to `AppBar`.
*   **UI**: Added "Reset Time" button to `DevControls` and integrated time reset into "Reset All".
*   **Feature**: Implemented game time progression (1s = 1 day) in `Home.tsx` using `useEffect`.
*   **Testing**: Added unit tests for `useTimeStore` and `gameTimeHelper`, and updated `Home.test.tsx` to handle new icons.

### 2026-01-26
*   **Store**: Created a centralized `useLogStore` for persistent activity logging with auto-rotation (limit 50 entries).
*   **UI**: Replaced hardcoded logs in `ActivityLog` with a dynamic, color-coded display from `useLogStore`.
*   **Feature**: Integrated logging into berry gathering and implemented a "Reset All" functionality that clears logs and adds initial system messages.
*   **Testing**: Added unit tests for `useLogStore` and verified visual changes with Playwright screenshots.

### 2026-01-26
*   **UI**: Expanded Dev Controls to include "+10 Wood" and "+10 Mud" buttons.
*   **UI**: Updated "Reset" button to "Reset All" to clear all resources (Berries, Beavers, Wood, Mud).
*   **Testing**: Added `src/components/ui/DevControls.test.tsx` to verify the new controls and reset logic.

### 2026-01-26
*   **UI**: Added Wood and Mud counters to the `Statistics` component.
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
