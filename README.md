# 🦫 Damn Beavers

An immersive, dark incremental game built with React, Vite, TypeScript, and Zustand. Manage a colony of beavers, engineer massive dams, and transition from a primitive wood-gnawing society to a high-tech hydraulic civilization.

## 🌟 Vision

Damn Beavers is a resource management simulator inspired by "Kittens Game". It explores the themes of exponential growth and ecological balance. What starts as a simple clicker evolves into a complex web of industrial automation and planetary-scale environmental manipulation.

## 🏗️ Core Gameplay

*   **Harvest**: Collect Wood, Mud, and Food.
*   **Populate**: Build Lodges to attract more beavers.
*   **Assign**: Distribute your workforce (Gatherers, Hunters, Engineers).
*   **Research**: Spend Science to unlock advanced technologies.
*   **Automate**: Build Dams and Sawmills to generate Hydro Power.

## 🛠️ Tech Stack

*   **Framework**: React + Vite
*   **Language**: TypeScript (Strict Mode)
*   **State Management**: Zustand (with Persistence)
*   **Styling**: Tailwind CSS
*   **Icons**: Lucide React

## ⚡ Game Events

To keep the gameplay dynamic, Damn Beavers features a variety of events that can trigger based on probability or specific milestones.

### Random Events (The "Luck" Factor)

*   **Spring Flood**: Increases water pressure and energy generation for 5 minutes, but carries a 5% chance of damaging a Simple Dam.
*   **Dry Season**: River levels drop. Food production from fishing is halved, and Hydro Power efficiency decreases.
*   **Wandering Kit**: A lone beaver arrives at your colony. If you have space in a Lodge, they join for free; otherwise, they leave a small gift of "Wild Berries" (Food).
*   **Termite Infestation**: A temporary debuff that slowly consumes 1% of your Wood reserves every tick for 30 seconds.

### Narrative Milestones (The "Lore")

*   **The Great Collapse**: Occurs when you build your first Massive Dam. Unlocks the "Safety Engineering" research branch.
*   **The First Spark**: Triggered upon generating 100 Hydro Power. A message appears: "The water hums with a new kind of power. We are no longer just builders; we are masters of lightning."
*   **Timber Shortage**: If the forest is over-harvested, a "Conservationist Beaver" appears, offering a choice: slow down production for a permanent efficiency bonus, or push forward and risk a permanent decrease in forest regrowth.

## 🔬 Late-Game Mechanics

As your empire grows, the scale of management shifts:

*   **The Turbine Grid**: Link multiple dams to create a power grid. Energy becomes a resource required to run "Deep-Gnaw Excavators."
*   **Logistics & Trade**: Build "River Barges" to trade excess Fur and Fish with neighboring animal civilizations (The Otter Syndicate, The Squirrel Cartel).
*   **Environmental Impact**: Monitor the "Planetary Humidity" index. High levels unlock "Rain Seeders," while low levels lead to "Desertification" risks.

## 🚀 Getting Started

### Prerequisites

*   Node.js (v18+)
*   npm or yarn

### Installation

Clone the repository:

```bash
git clone https://github.com/tucano/damn-beavers.git
cd damn-beavers
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## 📊 Technical Architecture

### Game Loop

The engine runs on a `setInterval` (1 tick/second) that handles:

*   **Resource Generation**: `sum(Job * Rate) * Bonuses`
*   **Consumption**: `Population * Food_Per_Beaver`
*   **Event Triggering**: A probability check (e.g., 0.1% per tick) to launch a Random Event.

### State Schema

Managed via Zustand for high performance and easy persistence:

```typescript
interface BeaverState {
  resources: { [key: string]: { amount: number; max: number; rate: number } };
  buildings: { [key: string]: number };
  beavers: { total: number; jobs: { [key: string]: number } };
  unlocks: string[];
  activeEvents: string[]; // Track current buffs/debuffs
}
```

## 🗺️ Roadmap

*   **Phase 1 (The Wood Era)**: MVP with basic clicking and population growth.
*   **Phase 2 (The Engineering Era)**: Tech tree, Science, and storage caps.
*   **Phase 3 (The Industrial Era)**: Hydro Power, automated production, and trade.

## 🎨 UI Design

*   **Theme**: Dark Mode (#1a1a1a)
*   **Primary Colors**: Wood Brown (#8B4513) & Water Blue (#0077BE)
*   **Layout**: Three-column dashboard (Stats | Actions | Log)

---

Created with the help of Gemini - Built for the Beaver Empire.