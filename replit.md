# Overview

This is a full-stack production data collection system for Santher Personal Care, built to track daily pump rotation data across multiple production lines. The application uses a monorepo structure with separate frontend and backend workspaces, sharing common schema definitions. The system manages two groups of production lines (Grupo1: L90-L94, L80-L83; Grupo2: L84-L85) with different data collection requirements and provides real-time data entry, historical dashboards, and Excel export capabilities.

# Recent Changes

**November 11, 2025**:
- ✅ Fixed Tailwind CSS styling issue by updating `tailwind.config.ts` to use absolute paths with `import.meta.url` for proper content scanning in monorepo workspace
- ✅ Updated `postcss.config.js` to point to correct Tailwind config path when running from Express server process
- ✅ Renamed project directories: `client/` → `frontend/` and `server/` → `backend/`
- ✅ Updated all configuration references in `package.json`, `tsconfig.json`, `backend/setup-vite.ts`, and `backend/index.ts`
- ✅ Application successfully running on port 5000 with full Tailwind CSS styling

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Monorepo Structure

**Problem**: Managing a full-stack application with shared type definitions and database schemas between frontend and backend.

**Solution**: npm workspaces monorepo with three packages:
- `frontend/` - React/Vite client application
- `backend/` - Express.js server
- `shared/` - Shared TypeScript types and Drizzle ORM schemas

**Rationale**: This architecture ensures type safety across the stack, eliminates code duplication, and allows independent deployment of frontend and backend while maintaining consistency. The shared package acts as a single source of truth for data structures.

## Frontend Architecture

**Technology Stack**: React 18 + TypeScript + Vite + TailwindCSS + shadcn/ui

**Design Pattern**: Component-based architecture with separation of concerns:
- Pages (`src/pages/`) - Route-level components
- Components (`src/components/`) - Reusable UI components organized by feature
- Hooks (`src/hooks/`) - Custom React hooks for shared logic
- Lib (`src/lib/`) - Utility functions and configurations

**State Management**: 
- **Problem**: Need real-time data synchronization with backend without complex state management
- **Solution**: TanStack Query (React Query) for server state management
- **Benefits**: Automatic caching, background refetching, optimistic updates, and simplified data fetching logic

**Routing**: 
- **Library**: wouter (lightweight React router)
- **Authentication Flow**: Protected routes check session status via `/api/auth/status` endpoint

**Form Handling**:
- **Problem**: Complex forms with validation for production data entry
- **Solution**: React Hook Form + Zod validation + shared schemas from backend
- **Features**: Type-safe forms, real-time validation, automatic error handling

**UI Components**: shadcn/ui component library built on Radix UI primitives with Tailwind CSS styling for consistency and accessibility.

## Backend Architecture

**Technology Stack**: Express.js + TypeScript + Drizzle ORM

**Design Pattern**: Layered architecture with clear separation:
- `routes.ts` - API route definitions and request handlers
- `storage.ts` - Storage interface abstraction
- `mysql-storage.ts` - MySQL implementation of storage interface
- `db.ts` - Database connection configuration

**Database Abstraction**:
- **Problem**: Need flexibility to switch between storage implementations (memory vs. database) for development/testing
- **Solution**: IStorage interface with multiple implementations
- **Implementations**:
  - `MemStorage` - In-memory storage for testing
  - `MySQLStorage` - Production MySQL storage via Drizzle ORM
- **Benefits**: Easy testing, deployment flexibility, clean separation of concerns

**Database ORM**: 
- **Choice**: Drizzle ORM with MySQL2 driver
- **Rationale**: Type-safe database queries, excellent TypeScript integration, lightweight, and schema-first design that integrates with shared types
- **Schema Location**: `shared/schema.ts` - Single source of truth for database structure and TypeScript types

**Session Management**:
- **Solution**: express-session with in-memory store (development) or database store (production)
- **Security**: HTTP-only cookies, configurable secure flag based on environment
- **Authentication**: Simple access code verification (`UFHPC@2025` default) stored in database

**Development Server**:
- **Problem**: Need seamless development experience with HMR for frontend
- **Solution**: Vite middleware integration in development mode (`setup-vite.ts`)
- **Production**: Static file serving from built frontend
- **Benefits**: Fast HMR during development, single server process for both frontend and backend

## Data Model

**Collections**:
1. `auth_config` - Access code configuration
2. `coleta_grupo1` - Production data for lines L90-L94, L80-L83
3. `coleta_grupo2` - Production data for lines L84-L85

**Schema Strategy**: 
- **Problem**: Different production lines have different data collection requirements
- **Solution**: Separate tables for each group with shared base fields and group-specific fields
- **Shared Fields**: id, createdAt, dataColeta, linhaProducao, sku, pesoSacolaVarpe, velocidadeLinha
- **Group-Specific Fields**: Different pump rotation parameters per manufacturing configuration

**Type Safety**: Drizzle-zod integration generates Zod schemas from Drizzle table definitions, ensuring validation schemas match database schema exactly.

## Build and Deployment

**Build Process**:
- Frontend: Vite builds to `dist/public/`
- Backend: esbuild bundles to `dist/index.js`
- Production: Single Node.js process serves both static files and API

**Database Migrations**:
- **Tool**: Drizzle Kit
- **Location**: `migrations/` directory at root
- **Command**: `npm run db:push` applies schema changes to database
- **Configuration**: `backend/drizzle.config.ts`

# External Dependencies

## Database

**MySQL Database**:
- **Connection**: mysql2 driver with connection pooling
- **Configuration**: Environment variables (DATABASE_URL or individual DB_* variables)
- **Default**: `ufhpc_producao` database on localhost
- **ORM**: Drizzle ORM for type-safe queries and migrations

## Third-Party Services

**None**: Application is self-contained with no external API dependencies.

## Key NPM Packages

**Frontend**:
- `@tanstack/react-query` - Server state management and data fetching
- `react-hook-form` - Form state management
- `zod` - Runtime type validation
- `@hookform/resolvers` - Zod integration for react-hook-form
- `date-fns` & `date-fns-tz` - Date manipulation and timezone handling
- `exceljs` - Excel file generation for data export
- `wouter` - Lightweight routing
- `@radix-ui/*` - Headless UI primitives for accessibility
- `tailwindcss` - Utility-first CSS framework
- `class-variance-authority` & `clsx` - Dynamic className composition

**Backend**:
- `express` - Web server framework
- `express-session` - Session middleware
- `drizzle-orm` - Type-safe ORM
- `mysql2` - MySQL database driver
- `zod` - Schema validation (shared with frontend)
- `nanoid` - Unique ID generation
- `esbuild` - Production bundler
- `tsx` - TypeScript execution for development

**Development**:
- `vite` - Frontend build tool and dev server
- `drizzle-kit` - Database migration tool
- `typescript` - Type system
- `@replit/*` - Replit-specific development tooling (error overlay, cartographer, dev banner)