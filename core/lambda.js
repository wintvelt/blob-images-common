import AWS from "aws-sdk";

var Lambda = new AWS.Lambda();

export const lambda = {
    invoke: (params) => Lambda.invoke(params).promise()
};