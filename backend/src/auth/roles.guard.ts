import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';@Injectable() export class RolesGuard implements CanActivate{canActivate(_ctx:ExecutionContext){return true;}}
