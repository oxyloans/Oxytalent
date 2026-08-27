# Shift — React + TypeScript Job Board Template

A job board template built with React 18, TypeScript, and Vite. No UI
framework dependency — all styling is plain CSS using a small design-token
system, so it's easy to reskin.

## Features

- Searchable, filterable job grid (by keyword and category)
- Job detail drawer with full description, responsibilities, and requirements
- Sample dataset of 7 jobs across 5 categories (`src/data/jobs.ts`) — replace
  with your own data or wire up to an API
- Fully typed with TypeScript, strict mode on
- Responsive down to mobile
- Zero external UI libraries — ~150KB gzipped JS

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview   # optional: preview the production build locally
```

## Project structure

```
src/
  components/
    JobCard.tsx      # single job card ("index card" on the board)
    JobDetail.tsx    # slide-in detail drawer
  data/
    jobs.ts          # Job type + sample listings — swap for your API
  App.tsx            # search, filters, grid, drawer wiring
  App.css            # component styles
  index.css          # global styles + design tokens (colors, fonts)
```

## Customizing

- **Data**: replace the `JOBS` array in `src/data/jobs.ts`, or fetch from an
  API inside `App.tsx` with `useEffect`.
- **Colors / fonts**: all design tokens live in `src/index.css` under `:root`
  as CSS variables (`--ink`, `--paper`, `--brass`, `--signal`, etc).
- **Apply flow**: the "Apply for this role" button in `JobDetail.tsx` currently
  shows an alert — wire it up to your ATS, a mailto link, or a form.

## License

Free to use for personal or commercial projects.
