# Speckit Constitution

Purpose
- Provide a compact, machine- and human-friendly rulebook for producing deterministic, reviewable specs ("specks") used as inputs to AI coding agents.

Core Principles
- Minimal surface area: each speck should be as small as possible while still enabling deterministic generation of the target file(s).
- Explicit inputs: include data models, required file paths, exact exports, and runtime commands (dev/build/test) every time.
- Example-driven: include at least one concrete example or acceptance test for every non-trivial behavior.
- Idempotency: re-running the same speck should produce functionally equivalent results.

Required Sections (order matters)
1. Metadata: name, author, date, target stack (versions), and entrypoint file path.
2. Goal (1-2 sentences): what the generated code must accomplish.
3. Data model(s): named types with field names, types, and validation rules.
4. File map: exact relative file paths and a one-line description of each file's role.
5. API/behavior spec: endpoints, method, request/response shape, and status codes (if applicable).
6. UX / interactions: explicit user flows or function-call sequences, plus acceptance criteria.
7. Dev & test commands: exact shell commands to run locally (zsh examples preferred).
8. Minimal test cases: 2–5 verifiable tests that the generator should satisfy.

Formatting & Naming
- Use YAML frontmatter for Metadata when speck is multi-file. Example:
  ---
  name: nuxt4-tasklist
  stack: nuxt4@latest, pinia, tailwind
  entry: server/api/tasks.ts
  ---
- Use `/** FILE: path/to/file */` comments in prompts to indicate which file to create.
- Prefer concrete filenames over vague descriptors (e.g., `stores/tasks.ts` not "store for tasks").

Chunking rules for AI agents
- One file per generation request. Provide only the spec lines required for that file.
- For complex files, ask for a tests-first small unit (e.g., store actions) then the implementation.
- For multi-file changes, generate files in this order: server routes → types → stores/composables → components → pages → tests.

Testing & Verification
- Every speck must include at least one runnable verification step (Vitest unit, simple CLI command, or `curl` example).
- Include expected output or assertions (exact text, JSON shape, or HTTP status).

Conventions (project-agnostic, but required)
- Type names: PascalCase (e.g., `Task`), filenames: kebab or lower camel as project prefers.
- Server routes: `server/api/*` using Nit ro `defineEventHandler` for Nuxt projects.
- State: `stores/*` for Pinia stores, with `defineStore('name', {...})` signature.
- Network: prefer `$fetch`/`useFetch` in Nuxt; prefer `readBody(event)` on server handlers.

Error handling and scope limits
- Specks must call out desired error behavior: e.g., "return 400 for missing title".
- Do not assume persistence beyond what the speck states — if in-memory is acceptable, specify it.

Example (mini) — Task model snippet
- Data model:
  - id: string (uuid)
  - title: string (required)
  - completed: boolean (default false)
- File map:
  - `server/api/tasks.ts`: CRUD handlers (in-memory)
  - `types/task.ts`: `export interface Task { ... }`
- Dev command: `pnpm dev`
- Verification (curl):
  - `curl -X POST http://localhost:3000/api/tasks -d '{"title":"test"}'` → 201 with JSON `title: "test"`.

Usage notes for AI agents
- Always echo back the exact file path you will produce before producing code.
- If the speck references project-specific conventions (naming, lint rules), extract and follow them exactly.
- After generating a file, run the provided verification step; if it fails, include the failing output in follow-up edits.

Revision process
- Keep specks small and iterative. After each generated file run tests and update the speck with any concrete deviations discovered.


---
End of Speckit Constitution
