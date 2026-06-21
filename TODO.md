# TODO - UI alignment + layout system

## Steps
- [x] 1) Update `src/styles.css` with CSS variables + `.app-container`.
- [x] 2) Refactor `src/app/navbar/navbar.component.html` to wrap content in the container.
- [x] 3) Refactor `src/app/navbar/navbar.component.css` (use `.nav__*`, replace margins with `gap`, improve alignment).
- [x] 4) Refactor `src/app/home/home.component.css` to use shared container rules (alignment improvements).
- [x] 5) Run build (or start) to ensure the app compiles (budget warnings may remain).

# TODO - Course platform routes/pages

## Steps
- [x] 6) Fix Navbar “Browse courses” link to route to `/courses`.
- [x] 7) Add Course Details route: `/courses/:courseId`.
- [x] 8) Implement `CourseDetailsPage` (MVP: course + instructor + categories).

- [ ] 10) Add Course player UI (uses lessons + progress) + required NgRx slices if missing.

