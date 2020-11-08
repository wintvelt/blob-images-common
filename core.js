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
    diffDate as diffDateM,
    makeDateStr as makeDateStrM,
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
    cleanRecord as cleanRecordM,
} from './core/dbClean';
import {
    dbItem as dbItemM,
    dbCreateItem as dbCreateItemM
} from './core/dbCreate';
import {
    handler as handlerM,
    getUserFromEvent as getUserFromEventM,
} from './core/handler';
import {
    s3 as s3M,
} from './core/s3';
import {
    ses as sesM,
} from './core/ses';
import {
    cognito as cognitoM,
} from './core/cognito';
import {
    makeEmailSrc as makeEmailSrcM,
    emailBody as emailBodyM,
    row as rowM,
    textCell as textCellM,
    paragraph as paragraphM,
    greeting as greeteingM,
    buttonCell as buttonEscapeM,
    dividerCell as dividerCellM,
    buttonCell as buttonCellM,
    codeCell as codeCellM,
    signatureCell as signatureCellM,
    headerRow as headerRowM,
    footerRow as footerRowM,
    photoRow as photoRowM
} from './core/email';

export const sleep = sleepModule;
export const newPhotoId = newPhotoIdModule;
export const newGroupId = newGroupIdModule;
export const newAlbumId = newAlbumIdModule;
export const now = nowM;
export const expireDate = expireDateM;
export const diffDate = diffDateM;
export const makeDateStr = makeDateStrM;

export const otob = otobM;
export const btoa = btoaM;
export const RND = RNDM;
export const handler = handlerM;
export const getUserFromEvent = getUserFromEventM;

export const dynamoDb = dynamoDbM;
export const dbUpdate = dbUpdateM;
export const dbUpdateMulti = dbUpdateMultiM;
export const cleanRecord = cleanRecordM;
export const dbItem = dbItemM;
export const dbCreateItem = dbCreateItemM;

export const s3 = s3M;
export const ses = sesM;

export const cognito = cognitoM;

export const makeEmailSrc = makeEmailSrcM;
export const emailBody = emailBodyM;
export const row = rowM;
export const textCell = textCellM;
export const paragraph = paragraphM;
export const greeting = greeteingM;
export const buttonCell = buttonEscapeM;
export const dividerCell = dividerCellM;
export const buttonCell = buttonCellM;
export const codeCell = codeCellM;
export const signatureCell = signatureCellM;
export const headerRow = headerRowM;
export const footerRow = footerRowM;
export const photoRow = photoRowM;
