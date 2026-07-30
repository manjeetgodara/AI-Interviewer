# Merra Frontend

React landing page for the Merra conversational AI interview platform.

## Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4
- Lucide React (icons)

## Getting started

```bash
cd frontend
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local development server |
| `npm run build` | Type-check and production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run oxlint |

## Project structure

```
src/
  components/
    layout/          # Navbar, shell chrome
    landing/         # Hero, FeatureList, DashboardMockup, PartnerLogos
      DashboardMockup/
        VoiceSelector.tsx
        VideoFeed.tsx
        AudioPlayer.tsx
        ChatHistory.tsx
    ui/              # Shared primitives (Button, MerraLogo, Waveform)
  pages/
    LandingPage.tsx  # Composes landing sections
  App.tsx
  index.css          # Tailwind + design tokens
```
