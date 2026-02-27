# Todo List

A modern, responsive todo list web application built with React, TypeScript, and Tailwind CSS. Features full task management with localStorage persistence, loading states, and a clean component library.

![App Screenshot]({212CF09A-C095-475D-A7BE-6562D3B4B8DB}.png)

---

## Features

- **Create tasks** — Add new tasks with an inline text input
- **Edit tasks** — Update task titles at any time
- **Complete tasks** — Toggle completion with a custom checkbox
- **Delete tasks** — Remove tasks individually
- **Persistent storage** — Tasks are saved to localStorage automatically
- **Loading states** — Skeleton loaders on initial load, spinners during save operations
- **Component showcase** — Separate `/components` page demoing the full UI library
- **Responsive layout** — Works on mobile and desktop

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Language | TypeScript 5.9 |
| Build Tool | Vite 7 + SWC |
| Routing | React Router 7 |
| Styling | Tailwind CSS 4 |
| Variants | Class Variance Authority (CVA) |
| Persistence | use-local-storage |
| Icons | SVG via vite-plugin-svgr |

---

## Project Structure

```
src/
├── assets/
│   ├── icons/          # SVG icons (check, pencil, plus, spinner, trash, x)
│   └── images/         # App logo
├── components/         # Reusable UI primitives
│   ├── Badge.tsx
│   ├── Button.tsx
│   ├── ButtonIcon.tsx
│   ├── Card.tsx
│   ├── Container.tsx
│   ├── Icon.tsx
│   ├── InputCheckbox.tsx
│   ├── Skeleton.tsx
│   ├── Text.tsx
│   └── TextInput.tsx
├── core-components/    # Feature-specific components
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── MainContent.tsx
│   ├── TaskItem.tsx
│   ├── TaskList.tsx
│   └── TaskSummary.tsx
├── pages/              # Page-level components
│   ├── LayoutMain.tsx
│   ├── PageComponents.tsx
│   └── PageHome.tsx
├── hooks/              # Custom React hooks
│   ├── useTask.ts
│   └── useTasks.ts
├── helpers/
│   └── Utils.ts
├── models/
│   └── Task.ts
├── constants.tsx       # CVA variant definitions
├── App.tsx
├── main.tsx
└── index.css
```

---

## Data Model

```typescript
// src/models/Task.ts

enum TaskState {
  Creating = "creating",  // Task is being created/edited
  Created  = "created"    // Task has been saved
}

interface Task {
  id:        string;       // Random unique identifier
  title:     string;       // Task description
  completed: boolean;      // Completion status
  state?:    TaskState;    // Lifecycle state
}
```

Tasks are stored in localStorage under the key `"tasks"`.

---

## Routing

| Path | Page | Description |
|---|---|---|
| `/` | PageHome | Main task list |
| `/components` | PageComponents | UI component showcase |

Both pages share the `LayoutMain` layout (Header → MainContent → Footer).

---

## Custom Hooks

### `useTasks()`

Manages the full task list. Simulates a 2-second initial load delay.

```typescript
const {
  isLoadingTasks,      // true for the first 2 seconds
  tasks,               // Task[] from localStorage
  tasksCount,          // number of Created tasks
  completedTaskCount,  // number of completed tasks
} = useTasks();
```

### `useTask()`

Handles individual task CRUD operations. Save operations simulate a 1-second network delay.

```typescript
const {
  prepareTask,         // () => void — adds a task in Creating state
  updateTask,          // (id, { title }) => Promise<void>
  updateTaskStatus,    // (id, completed) => void
  deleteTask,          // (id) => void
  isUpdating,          // true while a save is in progress
} = useTask();
```

---

## UI Components

### Primitives (`src/components/`)

| Component | Description |
|---|---|
| `Text` | Typography — variants: `body-sm-bold`, `body-md`, `body-md-bold` |
| `Badge` | Status pill — variants: `primary` (green), `secondary` (pink) |
| `Button` | Primary action button with optional icon and loading state |
| `ButtonIcon` | Icon-only button — variants: `primary`, `secondary`, `tertiary` |
| `Card` | Bordered container with shadow and rounded corners |
| `Container` | Responsive max-width wrapper (`max-w-126`) |
| `Icon` | SVG wrapper with optional spin animation |
| `TextInput` | Underline-style text field with pink focus highlight |
| `InputCheckbox` | Custom checkbox with green accent and check icon |
| `Skeleton` | Animated pulse placeholder — rounded variants: `sm`, `lg`, `full` |

### Feature Components (`src/core-components/`)

| Component | Description |
|---|---|
| `Header` | App logo |
| `Footer` | Navigation links (Home / Components) |
| `MainContent` | Responsive content area (renders router outlet) |
| `TaskSummary` | Shows created task count and completion ratio |
| `TaskList` | Renders task list with skeleton loader and "New Task" button |
| `TaskItem` | Individual task row with view and edit modes |

---

## TaskItem Behavior

**View mode**
- Custom checkbox to toggle completion (renders title with strikethrough when done)
- Edit button (pencil icon) to enter edit mode
- Delete button (trash icon) to remove the task

**Edit mode**
- Auto-focused text input for the task title
- Cancel button (X) — discards changes; deletes the task if it was just created
- Save button (check) — saves the title with a 1-second simulated delay and spinner

---

## Styling

- **Tailwind CSS 4** for utility-first styling
- **CVA** for type-safe component variants defined in `src/constants.tsx`
- **Custom color palette:**
  - Green: `green-base`, `green-dark`, `green-light`
  - Pink: `pink-base`, `pink-dark`, `pink-light`
  - Gray: `gray-base`, `gray-dark`, `gray-100`, `gray-300`, `gray-400`
- Responsive breakpoints via Tailwind's `md:` prefix

---

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended)

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

### Build

```bash
pnpm build
```

### Preview production build

```bash
pnpm preview
```

### Lint

```bash
pnpm lint
```

---

## Application Flow

1. App mounts → `LayoutMain` renders Header, MainContent, Footer
2. `PageHome` loads → `TaskSummary` and `TaskList` render
3. `TaskList` shows 3 skeleton placeholders for 2 seconds (simulated load)
4. User clicks **New Task** → `prepareTask()` adds a task in `Creating` state
5. `TaskItem` renders in edit mode with auto-focused input
6. User types a title and clicks save → `updateTask()` runs with a 1-second delay and spinner
7. Task state changes to `Created` and appears in the list
8. User can toggle completion via checkbox → `updateTaskStatus()`
9. User can edit or delete any task at any time
10. All changes are automatically persisted to localStorage
