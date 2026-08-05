import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';import { map } from 'rxjs';
@Injectable() export class ResponseEnvelopeInterceptor implements NestInterceptor{intercept(_c:ExecutionContext,next:CallHandler){return next.handle().pipe(map((data)=>({success:true,data,meta:{timestamp:new Date().toISOString(),pagination:data?.pagination}})));}}
