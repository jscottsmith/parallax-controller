import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/styles.css'],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: false, // Set to true for production builds
  target: 'es2022',
  outDir: 'dist',
  // Exclude test files and utilities from the build
  external: [],
  // Ensure CSS files are handled properly
  loader: {
    '.css': 'copy',
  },
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
});
