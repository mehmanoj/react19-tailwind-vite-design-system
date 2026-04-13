import { existsSync } from 'node:fs';

if (!existsSync('.git')) {
  console.log('Skipping Husky install because no .git directory was found.');
  process.exit(0);
}

const husky = (await import('husky')).default;
console.log(husky());
