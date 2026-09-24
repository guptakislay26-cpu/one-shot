import { Injectable, Scope } from '@nestjs/common';
@Injectable({scope:Scope.REQUEST}) export class TenantContextService{tenant:any; prisma:any; userStationId?:string; set(tenant:any,prisma:any){this.tenant=tenant;this.prisma=prisma;} getPrisma(){return this.prisma;} getTenant(){return this.tenant;}}
