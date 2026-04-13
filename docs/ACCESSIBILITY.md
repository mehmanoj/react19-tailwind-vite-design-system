# Accessibility notes

This starter now includes:

- semantic labels for form controls
- keyboard-friendly tabs and modal focus management
- screen-reader support for breadcrumbs, pagination, toasts, and tooltips
- automated accessibility smoke tests with `vitest-axe`
- end-to-end accessibility scans with Playwright + axe
- Storybook accessibility addon support

Automated checks are helpful, but they do not guarantee full WCAG compliance on their own. Manual keyboard testing, screen-reader testing, and real-user validation should still be part of your release process.
