import { BadRequestException } from '@nestjs/common';
import { TenantMiddleware } from './tenant.middleware';

function createMiddleware(multitenancyEnabled = true) {
  const config = { get: jest.fn(() => multitenancyEnabled) } as any;
  const resolver = { resolveBySlug: jest.fn(async (slug: string) => ({ id: 'tenant-1', slug })) } as any;
  const tenantPrisma = { getClient: jest.fn(async () => ({ connected: true })) } as any;
  return { middleware: new TenantMiddleware(config, resolver, tenantPrisma), resolver, tenantPrisma };
}

test('resolves the slug only from the /{slug}/api route prefix', async () => {
  const { middleware, resolver, tenantPrisma } = createMiddleware();
  const request: any = { originalUrl: '/acme/api/work-orders?take=20' };
  const next = jest.fn();

  await middleware.use(request, {}, next);

  expect(resolver.resolveBySlug).toHaveBeenCalledWith('acme');
  expect(tenantPrisma.getClient).toHaveBeenCalledWith({ id: 'tenant-1', slug: 'acme' });
  expect(request.tenant.slug).toBe('acme');
  expect(next).toHaveBeenCalledTimes(1);
});

test('bypasses the unscoped Swagger route', async () => {
  const { middleware, resolver } = createMiddleware();
  const next = jest.fn();

  await middleware.use({ originalUrl: '/api/docs' }, {}, next);

  expect(resolver.resolveBySlug).not.toHaveBeenCalled();
  expect(next).toHaveBeenCalledTimes(1);
});

test('rejects a tenant API request without a tenant prefix', async () => {
  const { middleware } = createMiddleware();

  await expect(middleware.use({ originalUrl: '/api/work-orders' }, {}, jest.fn())).rejects.toBeInstanceOf(BadRequestException);
});
