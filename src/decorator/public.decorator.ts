import {SetMetadata} from "@nestjs/common";

export const PUBLIC_KEY = 'isPublic';

export const Public = (): any => SetMetadata(PUBLIC_KEY, true);