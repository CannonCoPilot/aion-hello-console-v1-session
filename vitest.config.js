import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/unit/**/*.test.js', 'tests/integration/**/*.test.js'],
    coverage: {
      reporter: ['text', 'html'],
      exclude: ['tests/**', 'playwright.config.js', 'vitest.config.js']
    }
  }
});
