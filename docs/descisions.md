# Engineering Decisions

## Tooling decision: Tailwind CSS v4 installation

### Context

TanStack Start and Vite v7 currently present peer dependency conflicts with Tailwind CSS v4 during installation.

### Decision

Tailwind CSS v4 was installed using the `--legacy-peer-deps` flag.

### Rationale

- The project requires Tailwind v4 features
- The conflict is limited to peer dependency resolution, not runtime behavior
- This allows progress without blocking initial development

### Tradeoffs

- Potential for future breaking changes
- Requires closer monitoring of dependency updates

### Mitigation

- Versions are locked in `package.json`
- The decision is documented for contributors
- Planned reevaluation once official compatibility is available



>Each app manages its own environment variables. Shared infrastructure variables live at the repository root.