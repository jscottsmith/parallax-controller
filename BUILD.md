# Build Configuration

This project uses a modern TypeScript build setup with **tsup** for efficient ES module compilation.

## Build Tools

- **tsup**: Modern TypeScript bundler that's fast and efficient
- **tsx**: TypeScript execution engine for development
- **TypeScript**: Latest version with modern configuration

## Build Commands

```bash
# Build the project (ES modules + CommonJS)
npm run build

# Build with watch mode
npm run build:watch

# Development mode (watch + build)
npm run dev

# Type checking only
npm run typecheck

# Clean build artifacts
npm run clean
```

## Output Structure

The build process generates the following files in the `dist/` folder:

```
dist/
├── index.js          # ES Module bundle
├── index.cjs         # CommonJS bundle
├── index.d.ts        # TypeScript declarations
└── index.js.map      # Source maps
```

## Configuration

### tsup.config.ts

- **Entry**: `src/index.ts`
- **Formats**: ES modules + CommonJS
- **Target**: ES2022
- **Features**: Tree shaking, source maps, declarations
- **Platform**: Browser

### tsconfig.json

- **Module**: ESNext
- **Target**: ES2022
- **Module Resolution**: Bundler
- **Strict**: Enabled
- **No Emit**: Let tsup handle compilation

## Package.json Exports

The package.json is configured for dual package support:

```json
{
  "main": "./dist/index.js",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    }
  }
}
```

## Development Workflow

1. **Development**: Use `npm run dev` for watch mode
2. **Testing**: Use `npm run test` for Jest tests
3. **Building**: Use `npm run build` for production builds
4. **Type Checking**: Use `npm run typecheck` for type validation

## Benefits of This Setup

- ⚡ **Fast**: tsup is significantly faster than plain tsc
- 🌳 **Tree Shaking**: Automatic dead code elimination
- 📦 **Bundling**: Single file output with dependencies
- 🗺️ **Source Maps**: Better debugging experience
- 📝 **Declarations**: Automatic .d.ts generation
- 🔄 **Watch Mode**: Fast incremental builds
- 🎯 **Modern**: Uses latest ES modules and TypeScript features
