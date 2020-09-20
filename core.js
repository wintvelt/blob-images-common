import { sleep as sleepModule } from './core/sleep';
import { RND as RNDM } from './core/RND';
import {
    newPhotoId as newPhotoIdModule,
    newAlbumId as newAlbumIdModule,
    newGroupId as newGroupIdModule,
} from './core/ids';
import {
    now as nowM,
    expireDate as expireDateM,
} from './core/date';
import {
    otob as otobM,
    btoa as btoaM,
} from './core/base64';
import {
    dynamoDb as dynamoDbM,
    dbUpdate as dbUpdateM,
    dbUpdateMulti as dbUpdateMultiM
} from './core/db';
import {
    handler as handlerM,
    getUserFromEvent as getUserFromEventM,
} from './core/handler';

export const sleep = sleepModule;
export const newPhotoId = newPhotoIdModule;
export const newGroupId = newGroupIdModule;
export const newAlbumId = newAlbumIdModule;
export const now = nowM;
export const expireDate = expireDateM;
export const otob = otobM;
export const btoa = btoaM;
export const RND = RNDM;
export const handler = handlerM;
export const getUserFromEvent = getUserFromEventM;

export const dynamoDb = dynamoDbM;
export const dbUpdate = dbUpdateM;
export const dbUpdateMulti = dbUpdateMultiM;