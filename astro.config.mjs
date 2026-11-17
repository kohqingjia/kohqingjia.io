// @ts-check
import { defineConfig } from 'astro/config';

// OWNER: Claude.
export default defineConfig({
  site: 'https://kohqingjia.io',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
});
