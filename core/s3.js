import AWS from "aws-sdk";

var S3 = new AWS.S3({
    apiVersion: "2006-03-01",
    params: { 
        Bucket: process.env.photoBucket || process.env.devBucket || 'blob-images-dev'
    }
});

export const s3 = {
    delete: (params) => S3.deleteObject(params).promise(),
    get: (params) => S3.getObject(params).promise(),
    getMetadata: (params) => S3.headObject(params).promise(),
    getSignedUrl: (params) => S3.getSignedUrl('putObject', params)
};