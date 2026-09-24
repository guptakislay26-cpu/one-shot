# FlyPal MRO Developer Notes

## Commands
- `npm run dev` starts backend on port 3000 and frontend on port 5173 under `/app`.
- `docker compose up --build` starts Postgres 14, Redis, MinIO, API, frontend, and Nginx.
- Backend checks: `npm --prefix backend run lint`, `npm --prefix backend run typecheck`, `npm --prefix backend run test`.
- Frontend checks: `npm --prefix frontend run lint`, `npm --prefix frontend run typecheck`, `npm --prefix frontend run build:strict`, `npm --prefix frontend run test`.
- Prisma: `npm --prefix backend run prisma:generate`, `prisma migrate dev`, and production `prisma migrate deploy`.

## Architecture
FlyPal MRO is a NestJS/React monorepo for Part-145 MRO operations. The backend has two Prisma schemas: tenant application data in `backend/prisma/schema.prisma` and the master tenant registry in `backend/prisma/master/schema.prisma`, whose client is generated separately to avoid client collisions. Runtime tenancy is handled by `TenantMiddleware`, `TenantPrismaService`, and `TenantContextService`; single-tenant local development can disable it with `MULTITENANCY_ENABLED=false`.

Every operational model carries `stationId`, soft-delete fields, UUID primary keys, snake_case database mappings, and indexes for station/deleted-at filtering. Station scoping and soft-delete filtering live in the Prisma extension helper, not at query sites. Legal-record mutations must be attributable, audited fire-and-forget, and never hard-deleted.

The API uses global response envelopes, a single exception filter, DTO validation with whitelist/forbid, and guards ordered as throttling, JWT, roles, permissions. Permission strings live in `backend/src/permissions/permission-catalog.ts`.

## Feature Pattern
Feature modules live under `backend/src/modules/<feature>/` with module, controller, service, and DTO files. Services talk directly to Prisma, enforce state machines in service methods, and use per-class Nest loggers. The four reference modules are fleet, customers, work-orders, and task-cards.

Frontend server state goes through `src/lib/api.ts` and one hook module per feature. Global auth, UI, and offline queues use Zustand stores. Routes are lazy-loaded under the `/app` basename.
