import { BadRequestException, Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { isMultitenancyEnabled } from '../config/env.validation';
import { TenantPrismaService } from './tenant-prisma.service';
import { TenantResolverService } from './tenant-resolver.service';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(
    private readonly config: ConfigService,
    private readonly resolver: TenantResolverService,
    private readonly tenantPrisma: TenantPrismaService,
  ) {}

  async use(req: any, _res: any, next: () => void): Promise<void> {
    if (!isMultitenancyEnabled(this.config.get<boolean>('MULTITENANCY_ENABLED'))) {
      return next();
    }

    const path = (req.originalUrl ?? req.url ?? req.path).split('?')[0];
    if (path === '/api/docs' || path.startsWith('/api/docs/')) return next();

    const match = path.match(/^\/([^/]+)\/api(?:\/|$)/);
    if (!match) {
      throw new BadRequestException('Tenant API routes must use /{tenant-slug}/api/...');
    }

    const [, slug] = match;
    const tenant = await this.resolver.resolveBySlug(slug);
    req.tenant = tenant;
    req.tenantPrisma = await this.tenantPrisma.getClient(tenant);
    next();
  }
}
