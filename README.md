# React 19 + Tailwind + Vite Design System

A production-style starter for an internal or product-facing design system built with **React 19**, **Vite 8**, **Tailwind CSS v4**, **Storybook**, and **Vitest + React Testing Library**.

## What is included

- Design tokens exposed in both CSS variables and TypeScript
- Light and dark theme support
- Reusable UI components:
  - Button
  - Badge
  - Card
  - Input
  - Textarea
  - Select
  - Checkbox
  - RadioGroup
  - Switch
  - Alert
  - Avatar
  - Tabs
  - Accordion
  - Tooltip
  - Modal
  - Toast
  - Table
  - Pagination
  - StatCard
  - Breadcrumbs
- Documentation-style single page demo in the app
- Storybook with:
  - React + Vite framework setup
  - Autodocs
  - a11y addon
  - Light / dark preview toolbar
  - Starter stories for foundations, actions, forms, feedback, data display, navigation, and overlays
- Vitest + React Testing Library setup
- 100% coverage thresholds for included component, context, hook, and utility files
- MIT license file

## Getting started

```bash
npm install
npm run dev
```

## Storybook

```bash
npm run storybook
```

Build the static Storybook site:

```bash
npm run build-storybook
```

## Test commands

```bash
npm run test
npm run test:coverage
```

## Build the app

```bash
npm run build
npm run preview
```

## Architecture

```text
.storybook/
storybook/
src/
  app/
  components/
    layout/
    ui/
  contexts/
  data/
  hooks/
  lib/
  stories/
  styles/
  test/
```

## Notes

- Tailwind is configured using the Tailwind v4 Vite plugin.
- Styling uses semantic CSS variables so you can extend tokens without rewriting components.
- Storybook stories are meant to be the starting point for your system’s living documentation.
- Test coverage thresholds are enforced in `vitest.config.ts`.

## Suggested next upgrades

- Add visual regression tooling such as Chromatic or Playwright snapshots
- Publish a library bundle with a dedicated `src/index.ts`
- Add motion primitives and chart tokens
- Add brand themes per product or client
