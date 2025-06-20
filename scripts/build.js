#!/usr/bin/env node

import { execSync } from 'child_process';
import { rmSync, existsSync } from 'fs';
import { join } from 'path';

const distPath = join(process.cwd(), 'dist');

// Clean dist folder
if (existsSync(distPath)) {
  console.log('🧹 Cleaning dist folder...');
  rmSync(distPath, { recursive: true, force: true });
}

// Run tsup build
console.log('🔨 Building with tsup...');
try {
  execSync('npx tsup', { stdio: 'inherit' });
  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
