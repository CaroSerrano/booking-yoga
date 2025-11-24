/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';

import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Utilería para manejar la ruta del directorio en entornos de monorepo/módulos ES
const dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

// Configuración exclusiva para pruebas (vitest)
export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'unit',
          include: ['src/**/*.spec.{ts,tsx}'],
          environment: 'jsdom',
          globals: true,
        },
      },
      {
        extends: true,
        plugins: [
          // El plugin de Storybook solo se carga cuando Vitest lo necesita (en este archivo)
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: 'playwright',
            instances: [
              {
                browser: 'chromium',
              },
            ],
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
    ],
  },
});
