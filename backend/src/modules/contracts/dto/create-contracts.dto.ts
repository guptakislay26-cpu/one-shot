import { IsNotEmpty, IsString, IsUUID } from 'class-validator';export class CreateDto{@IsUUID() stationId!:string;@IsString()@IsNotEmpty() title!:string;}
