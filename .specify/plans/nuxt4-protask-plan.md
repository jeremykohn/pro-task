**Nuxt 4 ProTask — Implementation Plan**

**Purpose**: Map the functional specification (Nuxt 4 ProTask) to a concrete file structure, implementation tasks, and acceptance criteria so work can move to `/speckit.implement`.

**Spec Source**: `.specify/specs/specify.md` (Nuxt 4 ProTask)

**Summary**
- **Feature**: Lightweight task manager with fast UI, persistence, accessibility, dark mode, and fuzzy search.
- **Framework**: Nuxt 4 (app directory) — follow spec constraints.

**File Structure (recommended)**
- **App entry & pages**:
  - `app/pages/index.vue` — Main app shell and task list page
  - `app/layouts/default.vue` — App layout (sidebar + content)

- **Components (Atomic Design)**:
  - `app/components/atoms/InputField.vue`
  - `app/components/atoms/Button.vue`
  - `app/components/molecules/TaskCard.vue` — single task preview (title, priority, completion toggle)
  - `app/components/molecules/TaskDetails.vue` — expanded description view
  - `app/components/organisms/TaskList.vue` — list and filtering
  - `app/components/organisms/SearchBar.vue` — fuzzy search input
  - `app/components/organisms/ThemeToggle.vue` — dark/light switch

- **State & types**:
  - `shared/types/task.ts` — `Task` interface
  - `stores/tasks.ts` — Pinia store for tasks with persistence plugin

- **Server API (optional local API)**:
  - `server/api/tasks.ts` — CRUD endpoints (if implementing server-side API)

- **Styling & assets**:
  - `app/assets/css/tailwind.css` — Tailwind entry
  - `app/components/atoms/Icon.vue` or use `nuxt-icons` wherever needed

- **Tests & QA**:
  - `tests/unit/components` — unit tests for components
  - `tests/e2e` — basic flows (create, toggle, filter, persistence)

**Implementation Tasks (ordered)**
1. Project setup
   - Initialize Nuxt 4 project (if not present)
   - Add dev dependencies: Tailwind, Pinia, `pinia-plugin-persistedstate`, Icon plugin, TypeScript strict config
   - Configure `tailwind.config` and `tsconfig` (strict)

2. Shared types & store
   - Create `shared/types/task.ts` from spec
   - Implement `stores/tasks.ts` (Pinia) with persisted state and actions: addTask, updateTask, toggleComplete, removeTask, search/filter helpers

3. Core UI
   - Build `TaskCard.vue` (atom/molecule) showing title, priority color, and completion toggle
   - Build `TaskList.vue` (organism) to render list with `transition-group`, filter controls, and priority color rules
   - Build `TaskDetails.vue` to show description on selection
   - Add `SearchBar.vue` with fuzzy-search behavior (debounced)

4. Theming & Accessibility
   - Implement `ThemeToggle.vue` with system-aware default and persisted preference
   - Ensure ARIA roles and keyboard navigation for task list and controls

5. Persistence & optimistic UI
   - Wire store persistence (localStorage) via `pinia-plugin-persistedstate`
   - Ensure optimistic UI updates when mutating tasks

6. Server API (optional)
   - Add `server/api/tasks.ts` if an API-backed persistence option is desired; otherwise keep client-only storage

7. Testing & QA
   - Unit tests for store and key components
   - E2E tests for flows (create -> complete -> filter -> persistence)

8. Polish & accessibility audit
   - Color contrast checks for priority colors and dark mode
   - Keyboard-only navigation tests and screen-reader checks

**Acceptance Criteria (mapped to Spec)**
- **Create & Organize**: Users can add a task with title, description (optional), and priority; new task appears in list immediately. (Test: Add task, assert visible and persisted)
- **Status Tracking**: Toggling completion visually updates with strike-through and state persists. (Test: Toggle -> UI shows strike-through -> reload retains state)
- **Smart Filtering**: Filter controls show All/Pending/Completed and update list instantly. (Test: Create tasks, apply each filter)
- **Priority Visuals**: Tasks visually color-coded: High=Red, Medium=Orange, Low=Blue; colors meet contrast. (Test: Inspect computed class and run contrast check)
- **Persistence**: Tasks survive page reload and browser close via persisted Pinia state. (Test: Create -> reload -> task present)
- **Real-time UI**: UI updates optimistically on user actions. (Test: Add/Delete/Toggle -> immediate UI change)
- **Responsive & Dark Mode**: Layout adapts to narrow screens and dark mode toggles correctly. (Test: Responsive breakpoint checks and theme toggle)
- **Search**: Fuzzy search returns relevant results quickly and is debounced. (Test: Search with partial terms)

**Assumptions**
- Project either already is a Nuxt 4 app or we will scaffold one.
- Client-side persistence via `localStorage` is acceptable by default (server API optional).
- Tailwind v4 and Pinia plugin are permitted per spec constraints.

**Risks & Clarifications (max 3)**
1. **Server vs client persistence** — The spec requires persistence but doesn't mandate server storage. Options: Client-only (`localStorage`) or add `server/api/tasks` for server-backed storage. Impact: offline support vs multi-device sync. (Q1)
2. **Search complexity** — Fuzzy search implementation choices: lightweight client-side fuzzy matching (e.g., fuse.js) vs custom simple substring match. Impact: speed vs dependency. (Q2)
3. **Task IDs scheme** — Use UUID v4 vs incremental numeric IDs. Impact: collision avoidance and distributed sync later. Reasonable default: UUIDs. (Q3)

**Deliverables**
- `/ .specify/plans/nuxt4-protask-plan.md` (this file)
- File list & component map above
- Implementation task list and tests to be created during `/speckit.implement`

**Estimates (rough)**
- Project scaffolding & config: 1–2 hours
- Store + types + persistence: 1–2 hours
- Core components & pages: 4–6 hours
- Theming & accessibility: 2–3 hours
- Tests & QA: 3–4 hours

**Next Steps**
- Confirm decisions for Q1–Q3 above (server persistence, fuzzy search library, ID scheme)
- Approve plan or request changes
- Run `/speckit.implement` to generate files and initial implementation once approved
