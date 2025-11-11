import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('[POST CSS CONFIG] LOADED - Tailwind config path:', path.join(__dirname, 'tailwind.config.ts'));

export default {
  plugins: {
    tailwindcss: { config: path.join(__dirname, 'tailwind.config.ts') },
    autoprefixer: {},
  },
}
