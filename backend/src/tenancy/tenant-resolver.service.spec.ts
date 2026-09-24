import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { TenantResolverService } from './tenant-resolver.service';

const encrypted = 'encrypted-password';
const encryption = { decrypt: jest.fn(() => 'secret') } as any;

function serviceWithTenant(tenant: any) {
  const master = { tenant: { findUnique: jest.fn(async () => tenant) } } as any;
  return { service: new TenantResolverService(master, encryption), master };
}

test('resolves an active tenant to a database URL and caches it', async () => {
  const { service, master } = serviceWithTenant({ id: 't1', slug: 'acme', name: 'Acme MRO', status: 'ACTIVE', dbUser: 'user', dbPassword: encrypted, dbHost: 'db:5432', dbName: 'tenant_acme' });
  await expect(service.resolveBySlug('acme')).resolves.toMatchObject({ slug: 'acme', databaseUrl: 'postgresql://user:secret@db:5432/tenant_acme' });
  await service.resolveBySlug('acme');
  expect(master.tenant.findUnique).toHaveBeenCalledTimes(1);
});

test('rejects suspended tenants', async () => {
  const { service } = serviceWithTenant({ id: 't1', slug: 'acme', name: 'Acme MRO', status: 'SUSPENDED', dbUser: 'user', dbPassword: encrypted, dbHost: 'db', dbName: 'tenant_acme' });
  await expect(service.resolveBySlug('acme')).rejects.toBeInstanceOf(ForbiddenException);
});

test('throws not found for unknown tenants', async () => {
  const { service } = serviceWithTenant(null);
  await expect(service.resolveBySlug('missing')).rejects.toBeInstanceOf(NotFoundException);
});
