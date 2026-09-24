import { Injectable, NestMiddleware } from '@nestjs/common';
import { isMultitenancyEnabled } from '../config/env.validation';
import { TenantPrismaService } from './tenant-prisma.service';
import { TenantResolverService } from './tenant-resolver.service';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(
    private readonly resolver: TenantResolverService,
    private readonly tenantPrisma: TenantPrismaService,
  ) {}

  async use(req: any, _res: any, next: () => void): Promise<void> {
    if (!isMultitenancyEnabled()) return next();

    const slug = req.path.split('/').filter(Boolean)[0];
    const tenant = await this.resolver.resolveBySlug(slug);
    req.tenant = tenant;
    req.tenantPrisma = await this.tenantPrisma.getClient(tenant);
    next();
  }
}
