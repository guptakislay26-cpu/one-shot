import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
export class CreateDto { @IsUUID() stationId!: string; @IsString() @IsNotEmpty() title!: string; @IsOptional() @IsString() description?: string; }
