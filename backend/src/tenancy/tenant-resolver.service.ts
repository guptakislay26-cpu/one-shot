import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { EncryptionService } from '../common/crypto/encryption.service';
import { MasterPrismaService } from './master/master-prisma.service';
import { ResolvedTenant } from './tenant.types';

type CacheEntry = { tenant: ResolvedTenant; expiresAt: number };

@Injectable()
export class TenantResolverService {
  private readonly cache = new Map<string, CacheEntry>();
  private readonly ttlMs = 60_000;

  constructor(
    private readonly master: MasterPrismaService,
    private readonly encryption: EncryptionService,
  ) {}

  async resolveBySlug(slug: string): Promise<ResolvedTenant> {
    const cached = this.cache.get(slug);
    if (cached && cached.expiresAt > Date.now()) return cached.tenant;

    const tenant = await this.master.tenant.findUnique({ where: { slug } });
    if (!tenant) throw new NotFoundException(`Tenant '${slug}' was not found`);
    if (tenant.status !== 'ACTIVE') {
      throw new ForbiddenException(`Tenant '${slug}' is ${tenant.status.toLowerCase()}`);
    }

    const password = this.encryption.decrypt(tenant.dbPassword);
    const databaseUrl = `postgresql://${encodeURIComponent(tenant.dbUser)}:${encodeURIComponent(password)}@${tenant.dbHost}/${tenant.dbName}`;
    const resolved: ResolvedTenant = {
      id: tenant.id,
      slug: tenant.slug,
      name: tenant.name,
      status: tenant.status,
      databaseUrl,
    };
    this.cache.set(slug, { tenant: resolved, expiresAt: Date.now() + this.ttlMs });
    return resolved;
  }
}
