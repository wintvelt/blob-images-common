import {
    S3Client, DeleteObjectCommand, GetObjectCommand, PutObjectCommand, ListObjectsV2Command, CopyObjectCommand, HeadObjectCommand
} from "@aws-sdk/client-s3"; // ES Modules import
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
    apiVersion: "2006-03-01",
    params: {
        Bucket: process.env.photoBucket || process.env.devBucket || 'blob-images-dev'
    },
    signatureVersion: 'v4'
});

const withBucket = (params) => ({
    Bucket: process.env.photoBucket || process.env.devBucket || 'blob-images-dev',
    ...params
});

export const s3 = {
    delete: (params) => {
        const command = new DeleteObjectCommand(withBucket(params));
        return s3Client.send(command);
    },
    get: (params) => {
        const command = new GetObjectCommand(withBucket(params));
        return s3Client.send(command);
    },
    put: (params) => {
        const command = new PutObjectCommand(withBucket(params));
        return s3Client.send(command);
    },
    list: (params) => {
        const command = new ListObjectsV2Command(withBucket(params));
        return s3Client.send(command);
    },
    copyObject: (params) => {
        const command = new CopyObjectCommand(withBucket(params));
        return s3Client.send(command);
    },
    getMetadata: (params) => {
        const command = new HeadObjectCommand(withBucket(params));
        return s3Client.send(command);
    },
    getSignedUrl: (params) => {
        const command = new PutObjectCommand(withBucket(params));
        return getSignedUrl(s3Client, command);
    },
    getSignedUrlGet: (params) => {
        const command = new GetObjectCommand(withBucket(params));
        return getSignedUrl(s3Client, command);
    }
};