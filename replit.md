# Personal Care System - Pump Rotation Data Collection

## Overview

This is a full-stack web application designed for collecting and managing daily pump rotation data in a personal care manufacturing environment. The system tracks various production parameters across multiple production lines (L80-L94), organized into two distinct equipment groups (Grupo 1 and Grupo 2). Users can register daily measurements, view historical data, and export records to Excel for analysis.

The application features session-based authentication with a simple access code system, allowing authorized personnel to input and manage production data from any device.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Monorepo Structure
The project uses npm workspaces to organize three main packages:
- **frontend**: React-based SPA with TypeScript
- **backend**: Express.js server with TypeScript
- **shared**: Common schemas and types shared between frontend and backend

### Frontend Architecture

**Technology Stack:**
- React 18 with TypeScript for type safety
- Wouter for client-side routing (lightweight React Router alternative)
- TanStack Query for server state management and data fetching
- React Hook Form with Zod for form validation
- shadcn/ui components built on Radix UI primitives
- Tailwind CSS for styling
- Vite as build tool and dev server

**Design Patterns:**
- Component-based architecture with clear separation of concerns
- Custom hooks for shared logic (useIsMobile, useToast, useConfirmer)
- API layer abstraction through queryClient utilities
- Responsive design with mobile-first approach

**Key Features:**
- Two main forms (FormularioGrupo1 and FormularioGrupo2) for different equipment groups
- Dashboard with filtering by date, week, month, and production line
- Excel export functionality using ExcelJS
- Dual-interface approach: Desktop sidebar navigation + Mobile drawer menu

### Backend Architecture

**Technology Stack:**
- Express.js web framework
- Drizzle ORM for database operations
- Postgres.js as database client
- Express-session for session management
- Zod for runtime validation
- ESBuild for production bundling

**Database Strategy:**
- PostgreSQL database (supports Neon serverless)
- Drizzle ORM provides type-safe database access
- Dual storage implementation pattern: MemStorage for development, MySQLStorage (PostgreSQL) for production
- Schema-first design with shared types between frontend and backend

**Session Management:**
- Express-session with configurable store (memory or PostgreSQL via connect-pg-simple)
- HTTP-only cookies for security
- Simple access code authentication (UFHPC@2025 default)

**Development Experience:**
- Vite integration in development mode with HMR
- SSR-style serving of frontend during development
- Production builds serve static files from dist/public

### Data Model

**Three main entities:**

1. **authConfig**: Stores the system access code
   - Single row configuration table
   - Default code: "UFHPC@2025"

2. **coletaGrupo1**: Production data for equipment group 1 (L90-L94, L80-L83)
   - 23 measurement fields including SKU, line speed, and various adhesive application points
   - Special fields (parametroPainel, acrisson) only for L80-L83 lines
   - Timestamp and production line tracking

3. **coletaGrupo2**: Production data for equipment group 2 (L84-L85)
   - 17 measurement fields specific to different equipment configuration
   - All lines include special parameter fields
   - Similar structure to Grupo1 but different adhesive application points

**Validation Strategy:**
- Shared Zod schemas in @workspace/shared package
- Drizzle-zod integration for automatic schema generation
- Runtime validation on both client and server

### API Structure

**Authentication Endpoints:**
- POST /api/auth/verify - Validates access code and creates session
- GET /api/auth/status - Checks authentication status
- POST /api/auth/logout - Destroys session

**Data Management Endpoints:**
- GET /api/coletas/grupo1 - Retrieve all Grupo 1 records
- GET /api/coletas/grupo2 - Retrieve all Grupo 2 records
- POST /api/coletas/grupo1 - Create new Grupo 1 record
- POST /api/coletas/grupo2 - Create new Grupo 2 record
- PUT /api/coletas/grupo1/:id - Update existing Grupo 1 record
- PUT /api/coletas/grupo2/:id - Update existing Grupo 2 record
- DELETE /api/coletas/grupo1/:id - Delete Grupo 1 record
- DELETE /api/coletas/grupo2/:id - Delete Grupo 2 record

**Response Format:**
- JSON responses for all API endpoints
- Consistent error handling with HTTP status codes
- Validation errors formatted using zod-validation-error

### Build and Deployment

**Development:**
- Concurrent frontend and backend development with Vite HMR
- Backend serves Vite middleware in development mode
- TypeScript compilation with project references

**Production:**
- Frontend built to static assets in dist/public
- Backend bundled with ESBuild to dist/index.js
- Single Node.js process serves both API and static files
- Environment variables for database configuration

## External Dependencies

**Database:**
- PostgreSQL (supports standard PostgreSQL or Neon serverless)
- Connection via DATABASE_URL environment variable or individual DB_HOST, DB_PORT, DB_NAME, DB_PASSWORD variables
- Drizzle ORM handles migrations and schema management

**Third-party Services:**
- None required - fully self-contained application
- Optional: Neon Database for serverless PostgreSQL hosting

**Key NPM Packages:**
- drizzle-orm & drizzle-kit: Type-safe ORM and migration tool
- postgres: PostgreSQL client for Node.js
- express-session: Session management
- exceljs: Excel file generation for data export
- zod: Runtime type validation
- date-fns: Date manipulation and formatting
- Radix UI: Accessible component primitives
- TanStack Query: Async state management

**Development Tools:**
- tsx: TypeScript execution for development
- esbuild: Fast JavaScript bundler
- Vite: Frontend build tool with HMR
- TypeScript: Type checking across all packages