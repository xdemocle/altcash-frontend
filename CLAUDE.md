# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Package Manager

**IMPORTANT: This project uses `bun` as the package manager, NOT npm or yarn.**

All package operations should use `bun`:
- Install dependencies: `bun install`
- Add packages: `bun add <package>`
- Remove packages: `bun remove <package>`
- Run scripts: `bun run <script>` or `bun <script>`

## Development Commands

```bash
# Start development server (runs on http://localhost:3000)
bun dev

# Build for production
bun run build

# Start production server
bun start

# Lint code
bun run lint

# Format code with Prettier
bun run fix-code

# Export static site
bun run export
```

## Environment Setup

Create a `.env.local` file in the root with:

```
NEXT_PUBLIC_GRAPHQL_SERVER=http://197.81.132.186:4000
```

## Tech Stack & Architecture

### Core Technologies
- **Next.js 15.5.6** - React framework with Pages Router (not App Router)
- **React 19** - Latest React version
- **TypeScript 5.9.3** - Strict typing
- **Apollo Client 4** - GraphQL client with caching
- **MUI v7** - Material-UI component library
- **tss-react** - Styling solution (replaced deprecated @mui/styles)

### Key Architecture Patterns

#### 1. Apollo GraphQL Setup
- Apollo Client configured in `src/common/apollo/apollo-client.ts`
- Uses `apollo3-cache-persist` for offline-first caching with localforage
- Cache configuration in `src/common/apollo/apollo-cache.ts`
- GraphQL queries in `src/graphql/` directory
- Backend GraphQL server must be running for full functionality

#### 2. Component Architecture (Atomic Design)
Components follow atomic design principles:
- `src/components/atoms/` - Basic building blocks (buttons, icons, etc.)
- `src/components/molecules/` - Combinations of atoms (nav items, cards)
- `src/components/organisms/` - Complex UI sections (forms, sidebars)
- `src/components/templates/` - Page layouts (homepage, coin-buy, etc.)

Each component folder contains:
- `index.tsx` - Barrel export
- `<component-name>.tsx` - Component implementation
- `use-styles.tsx` - tss-react styling (if needed)

#### 3. Styling with tss-react
This project migrated from deprecated `@mui/styles` to `tss-react`:

```typescript
// use-styles.tsx pattern
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(4)
    }
  }
}));

export default useStyles;

// Component usage
const { classes } = useStyles();  // IMPORTANT: Destructure { classes }
```

**Never use** `const classes = useStyles()` - always destructure `{ classes }`

#### 4. Context Providers
Global state management through React Context:
- `src/context/global.tsx` - App-wide state (sidebar, tabs, bitcoin price)
- `src/context/favourites.tsx` - User coin favourites (persisted to localStorage)
- `src/context/auth.tsx` - Authentication state (currently unused)

Providers are composed in `src/pages/_app.tsx`:
```
GlobalProvider > UserCoinFavouritesProvider > ApolloProvider > ThemeProvider
```

#### 5. Custom Hooks
- `src/hooks/use-global.tsx` - Access global context
- `src/hooks/use-favourites.tsx` - Access favourites context
- `src/hooks/use-auth.tsx` - Access auth context

#### 6. Pages Router Structure
- Pages in `src/pages/` directory
- Dynamic routes use `[param].tsx` syntax
- Special files:
  - `_app.tsx` - App wrapper with providers
  - `_document.tsx` - HTML document structure
  - `index.tsx` - Homepage route

#### 7. Emotion for CSS-in-JS
- Using `@emotion/react` and `@emotion/styled`
- Emotion cache setup in `src/common/createEmotionCache.ts`
- Server-side rendering configured in `_document.tsx`

## Important Patterns & Conventions

### GraphQL Integration
- All GraphQL operations centralized in `src/graphql/queries.ts` and `src/graphql/mutations.ts`
- Use Apollo hooks (`useQuery`, `useMutation`, `useLazyQuery`) in components
- Cache policies configured per query basis

### Server/Client Detection
Use `isServer()` utility from `src/common/utils.tsx` to conditionally execute code:
```typescript
if (!isServer()) {
  // Client-only code (window, localStorage, etc.)
}
```

### Theme Customization
- Global theme in `src/common/theme.ts`
- MUI theme customization for colors, typography, breakpoints
- Global CSS in `src/styles/global.css`

### Component Patterns
- Use functional components with hooks
- TypeScript interfaces for props
- Barrel exports via `index.tsx` files
- Colocation of styles with components

## Known Issues

### SSR Warning (Non-blocking)
There's a development-time SSR error: "Element type is invalid: expected a string... but got: undefined"
- **Does NOT affect production builds or functionality**
- **Does NOT prevent client-side rendering**
- Appears during server-side rendering with tss-react
- Application works correctly despite this warning

## Dependencies Notes

### Recent Migration
This project recently migrated from:
- `@mui/styles` → `tss-react` (for React 19 + MUI v7 compatibility)
- `apollo-link-queue` → removed (incompatible with Apollo Client 4)
- React 18 → React 19
- MUI v6 → MUI v7

### Key Third-Party Libraries
- `react-parallax` - Parallax effects on homepage
- `socket.io-client` - Real-time communication
- `react-paystack` - Payment integration
- `cryptocurrency-icons` - Crypto currency icons
- `moment` / `moment-timezone` - Date handling
- `lodash` - Utility functions

## Backend Integration

The frontend connects to a GraphQL backend (altcash-backend):
- Backend must be running at `NEXT_PUBLIC_GRAPHQL_SERVER` URL
- Backend handles order processing, market data, and user operations
- See backend's CLAUDE.md for backend-specific guidance
