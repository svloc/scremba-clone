# Bootstrap 5 Migration TODO

> Single source of truth. Follow **one component at a time**.

## Overall migration strategy
- Prefer **Bootstrap 5.3.8 components** (cards, forms, buttons, utilities) over custom CSS.
- Replace spacing/layout styles with **Bootstrap utility classes** wherever it does not cause regressions.
- Keep minimal custom CSS only when Bootstrap cannot match the existing visuals/behavior.
- Do **not** perform project-wide CSS cleanup until all targeted components are migrated.
- After each component: update status, list removed CSS, list introduced Bootstrap classes, and report remaining CSS that couldn’t be replaced.

## Components to migrate (tracked)

| Component | Location | Status | Notes |
|---|---|---|---|
| LoginComponent | `src/app/features/auth/login/login.component.ts` | Completed | Replaced inline form layout with Bootstrap utilities/components; kept minimal brand + error styles |
| NavbarComponent | `src/app/navbar/navbar.component.html` + `.css` | In Progress | Replace nav flex/layout/hover + responsive link visibility |
| HomeComponent | `src/app/home/home.component.html` + `.css` | In Progress | Complex clip-path/absolute positioning; migrate what’s safely replaceable (done so far: markup spacing utilities + non-risky CSS dedupe of duplicated `.home-container`) |


## Notes (findings & decisions)
- Ripgrep binary not available in the environment tools, so repo inspection is done via `list_files` and `read_file`.
- Start with **LoginComponent** because it’s self-contained (inline styles) and low regression risk.

