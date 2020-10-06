import AWS from "aws-sdk";

var awsCognito = new AWS.CognitoIdentityServiceProvider({
    apiVersion: "2016-04-18",
    // params: {
    //     UserPoolId: process.env.userPoolId || process.env.devUserPoolId
    // }
});

const params = (userId) => ({
    UserPoolId: process.env.userPoolId || process.env.devUserPoolId,
    Username: userId.slice(1)
});

export const cognito = {
    disableUser: (userId) => awsCognito.adminDisableUser(params(userId)).promise(),
    deleteUser: (userId) => awsCognito.adminDeleteUser(params(userId)).promise()
};