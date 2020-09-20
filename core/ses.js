import AWS from "aws-sdk";

const client = new AWS.SES;

export const ses = {
    send: (params) => client.sendEmail(params).promise(),
};