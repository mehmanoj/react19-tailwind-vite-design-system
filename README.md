# React 19 + Tailwind + Vite Design System

A production-style starter for an internal or product-facing design system built with React 19, Vite 8, Tailwind CSS v4, Storybook, Vitest, React Testing Library, Playwright, Lighthouse CI, and Husky.

## What is included

- design tokens exposed in both CSS variables and TypeScript
- light and dark theme support
- reusable UI components for actions, forms, feedback, navigation, overlays, and data display
- Storybook with docs and accessibility addon support
- Vitest + React Testing Library setup with 100% thresholds
- accessibility smoke tests with `vitest-axe`
- Playwright end-to-end and accessibility tests with `@axe-core/playwright`
- Lighthouse CI performance assertions
- Prettier + lint-staged + Husky pre-commit hook
- MIT license file

## Getting started

```bash
npm install
npm run dev
```

## Storybook

```bash
npm run storybook
npm run build-storybook
```

## Unit tests

```bash
npm run test
npm run test:coverage
```

## Playwright tests

Install browsers once:

```bash
npx playwright install
```

Then run:

```bash
npm run test:e2e
npm run test:a11y
```

## Performance testing

```bash
npm run perf
```

This builds the app and runs Lighthouse CI against the preview server using the thresholds defined in `lighthouserc.cjs`.

## Formatting and git hooks

Format the codebase manually:

```bash
npm run format
npm run format:check
```

Because zip downloads do not include a `.git` folder, initialize git before enabling hooks:

```bash
git init
npm run prepare
```

After that, staged files will be formatted with Prettier on pre-commit.

## Accessibility notes

This starter has been strengthened for WCAG-oriented development with:

- associated labels and descriptions for form controls
- keyboard-friendly tabs and modal focus management
- screen-reader support for breadcrumbs, pagination, toasts, and tooltips
- automated accessibility scans in both unit and browser tests

Automated checks do not guarantee full WCAG compliance. Manual keyboard testing, screen-reader testing, and inclusive user testing should still be part of your release process.

See `docs/ACCESSIBILITY.md` for the project note.

## Build the app

```bash
npm run build
npm run preview
```

## Architecture

```text
storybook/
src/
  accessibility/
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
e2e/
docs/
```
