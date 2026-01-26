# Damn Beavers Roadmap

This document outlines the development plan for "Damn Beavers," an incremental game inspired by "Kittens Game." The roadmap is divided into four main phases, each focusing on a specific set of features and mechanics.

## Phase 1: The Wood Era (MVP)

This phase focuses on establishing the core gameplay mechanics, including resource management, population growth, and the main game loop. The goal is to create a playable MVP with a clear and intuitive UI.

### Core Mechanics

- **Game State**: Define the initial game state, including resources (Wood, Mud, Berries (blackberries)), buildings (Lodge), and beavers.
- **Game Loop**: Implement the main game loop for resource generation and consumption (1 tick/second).
- **Beaver Jobs**: Allow players to assign beavers to different jobs (Gatherers, Hunters).

### UI Components

- **Resource Display**: Create a component to display the current amount, maximum, and rate of each resource.
- **Job Management**: Develop a UI for assigning and unassigning beavers to jobs.
- **Building Construction**: Implement a section for constructing new buildings.

### Game Structure

- **Three-Column Layout**: Structure the game into three columns: Stats, Actions, and Log, to provide a clear and organized dashboard.

## Phase 2: The Engineering Era

This phase introduces the technology tree and science mechanics, adding depth and complexity to the gameplay. It also includes random events and narrative milestones to keep the experience engaging.

### Core Mechanics

- **Science and Research**: Introduce Science as a new resource and implement a research system to unlock new technologies.
- **Technology Tree**: Design and implement a technology tree with multiple branches (e.g., Engineering, Agriculture).
- **Storage Caps**: Add storage caps for resources to create new challenges and encourage strategic planning.

### Dynamic Gameplay

- **Random Events**: Introduce random events (e.g., Spring Flood, Dry Season) to add unpredictability.
- **Narrative Milestones**: Implement narrative milestones that trigger based on specific achievements (e.g., "The Great Collapse").

## Phase 3: The Industrial Era

This phase focuses on automation and trade, allowing players to scale their empire and engage with a wider world. It also introduces a "Prestige" system to enhance replayability.

### Core Mechanics

- **Automation**: Introduce Hydro Power as a new resource and create buildings for automated production (e.g., Dams, Sawmills).
- **Trade System**: Implement a trade system with neighboring civilizations (e.g., The Otter Syndicate, The Squirrel Cartel).
- **Prestige System**: Add a "Prestige" system to unlock permanent bonuses and enhance replayability.

### UI Components

- **Trade UI**: Design a UI for managing trade routes and resources.
- **Automation Dashboard**: Create a dashboard to monitor and manage automated production.

## Phase 4: Polishing and Balancing

In the final phase, the focus will be on refining the UI/UX, balancing the game mechanics, and implementing a persistence layer to save and load the game state.

### UI/UX Refinements

- **Visual Indicators**: Add visual indicators for events, alerts, and milestones.
- **Improved Aesthetics**: Enhance the overall aesthetic of the game with improved styling and animations.
- **Tooltips and Guides**: Implement tooltips and guides to help new players understand the game mechanics.

### Game Balancing

- **Adjust Costs and Rates**: Fine-tune the costs, production rates, and event probabilities based on playtesting.
- **Player Feedback**: Gather and incorporate player feedback to improve the overall game experience.

### Persistence

- **Save and Load**: Implement a persistence layer to save and load the game state, allowing players to continue their progress.
