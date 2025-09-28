import { defineConfig } from 'tsup';
import { copyFileSync } from 'fs';
import { join } from 'path';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: {
    resolve: true,
    entry: ['src/index.ts'], // Only generate DTS for TypeScript files
  },
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: false, // Set to true for production builds
  target: 'es2022',
  outDir: 'dist',
  // Exclude test files and utilities from the build
  external: [],
  // Bundle configuration
  bundle: true,
  // Platform-specific settings
  platform: 'browser',
  // Global variables for UMD builds (if needed)
  globalName: 'ParallaxController',
  // Ensure proper module resolution
  noExternal: [],
  // Skip certain files
  skipNodeModulesBundle: true,
  // Define environment
  define: {
    'process.env.NODE_ENV': '"production"',
  },
  // Copy CSS files to dist directory
  publicDir: false,
  // Custom plugin to copy CSS file
  plugins: [
    {
      name: 'copy-css',
      buildEnd() {
        copyFileSync('src/styles.css', 'dist/styles.css');
      },
    },
  ],
});
