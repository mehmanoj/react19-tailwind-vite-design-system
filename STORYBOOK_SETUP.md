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

## Notes

- Active config directory: `storybook/`
- Hidden fallback config also included: `.storybook/`
- If you want to use the default Storybook folder later, change the scripts in `package.json`
