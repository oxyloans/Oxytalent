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
  app/                      # (routing lives in App.tsx today; split out here if it grows)
  components/
    JobCard.tsx             # single job card ("index card" on the board)
    JobDetail.tsx           # slide-in detail drawer
    common/
      ProtectedRoute.tsx    # route guard for pages that require login
  features/
    auth/                   # everything related to sign up / sign in lives here
      components/           # form fields, OTP input, work-status cards, layout shell
      context/AuthContext.tsx
      hooks/useAuth.ts, useCountdown.ts
      services/
        authService.ts      # <- the ONLY file the UI imports; swap this for real API calls
        mockDatabase.ts     # localStorage-backed mock DB (dev/demo only, see file header)
      types/auth.types.ts   # shared request/response contracts
      utils/validators.ts
      auth.css
  data/
    jobs.ts                 # Job type + sample listings — swap for your API
  pages/
    LandingPage.tsx / .css
    JobsPage.tsx
    auth/
      LoginPage.tsx          # email+password ⇄ mobile OTP toggle
      RegisterPage.tsx       # profile details -> mobile OTP verification
      ForgotPasswordPage.tsx # mobile OTP -> set new password
  App.tsx                   # route table (react-router-dom)
  App.css / index.css       # component styles + design tokens
```

## Authentication

The app ships with a full login/registration flow modeled on a
Naukri-style profile creation and login experience:

- **Register**: full name, email, password, mobile, work status
  (experienced/fresher), optional resume upload → OTP sent to the mobile
  number → verify → account created and the user is logged in.
- **Login**: toggle between **email + password** and **mobile + OTP**.
  Both land on the same session.
- **Forgot password**: mobile number → OTP → set a new password.

### This repo has no backend yet

`src/features/auth/services/authService.ts` is the single seam between
the UI and persistence — every component calls it, never `mockDatabase.ts`
directly. Right now it's backed by a localStorage mock
(`mockDatabase.ts`) that:

- "Sends" OTPs by printing them to the browser console instead of a real
  SMS gateway.
- Hashes passwords with a trivial non-cryptographic digest, purely so a
  plain-text password never sits in localStorage — this is **not** a
  security measure.

To go to production:

1. Stand up a real API (Node/Express, etc.) with a proper users table.
2. Replace the bodies of the functions in `authService.ts` with `fetch`
   calls to that API. No other file needs to change — components only
   ever import `authService`, and its function signatures already match
   what a REST client would look like (async, throws on failure).
3. Hash passwords server-side with bcrypt/argon2 + a per-user salt.
   Never validate OTPs or passwords on the client.
4. Wire real OTP delivery through an SMS/WhatsApp provider (e.g. MSG91,
   Twilio Verify).
5. Swap the demo session token in `issueSession()` for a real JWT (or
   httpOnly cookie session) issued by your API.

## Customizing

- **Data**: replace the `JOBS` array in `src/data/jobs.ts`, or fetch from an
  API inside `JobsPage.tsx` with `useEffect`.
- **Colors / fonts**: all design tokens live in `src/index.css` under `:root`
  as CSS variables (`--ink`, `--paper`, `--brass`, `--signal`, etc).
- **Apply flow**: the "Apply for this role" button in `JobDetail.tsx` currently
  shows an alert — wire it up to your ATS, a mailto link, or a form.
- **Protecting a page**: wrap any route in `<ProtectedRoute>` (see
  `src/components/common/ProtectedRoute.tsx`) to require login, e.g. a
  future `/profile` or `/dashboard` page.

## License

Free to use for personal or commercial projects.
