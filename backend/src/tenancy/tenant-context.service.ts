import { Inject, Injectable, InternalServerErrorException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { PrismaClient } from '@prisma/client';
import { ResolvedTenant } from './tenant.types';

type TenantRequest = {
  tenant?: ResolvedTenant;
  tenantPrisma?: PrismaClient;
  user?: { stationId?: string };
};

@Injectable({ scope: Scope.REQUEST })
export class TenantContextService {
  constructor(@Inject(REQUEST) private readonly request: TenantRequest) {}

  getPrisma(): PrismaClient {
    if (!this.request.tenantPrisma) {
      throw new InternalServerErrorException('Tenant Prisma client is unavailable for this request');
    }

    return this.request.tenantPrisma;
  }

  getTenant(): ResolvedTenant {
    if (!this.request.tenant) {
      throw new InternalServerErrorException('Tenant is unavailable for this request');
    }

    return this.request.tenant;
  }

  getUserStationId(): string | undefined {
    return this.request.user?.stationId;
  }
}
