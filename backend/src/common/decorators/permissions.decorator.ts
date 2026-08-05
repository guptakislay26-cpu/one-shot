import { SetMetadata } from '@nestjs/common'; export const PERMISSIONS_KEY='permissions'; export const Permissions=(...p:string[])=>SetMetadata(PERMISSIONS_KEY,p);
