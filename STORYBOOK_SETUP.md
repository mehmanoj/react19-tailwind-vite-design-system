# Storybook setup

This project uses a visible `storybook/` config directory so hidden-folder extraction issues do not block setup.

## Run locally

```bash
npm install
npm run storybook
```

## Build static Storybook

```bash
npm run build-storybook
```

## Accessibility in Storybook

The project keeps `@storybook/addon-a11y` enabled so stories can be checked during component development.

## Notes

- active config directory: `storybook/`
- hidden fallback config also included: `.storybook/`
- if you want to use the default Storybook folder later, change the scripts in `package.json`
