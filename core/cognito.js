import AWS from "aws-sdk";

var cognito = new AWS.CognitoIdentityServiceProvider({
    apiVersion: "2016-04-18",
    // params: {
    //     UserPoolId: process.env.userPoolId || process.env.devUserPoolId
    // }
});

export const disableUser = (userId) => {
    const params = {
        UserPoolId: process.env.userPoolId || process.env.devUserPoolId,
        Username: userId.slice(1)
    };
    console.log(params);
    return cognito.adminDisableUser(params).promise();
};