// import AWS from "aws-sdk";
import { CognitoIdentityProviderClient, AdminDisableUserCommand, AdminDeleteUserCommand } from "@aws-sdk/client-cognito-identity-provider"; // ES Modules import
const cognitoClient = new CognitoIdentityProviderClient({
    apiVersion: "2016-04-18",
    // params: {
    //     UserPoolId: process.env.userPoolId || process.env.devUserPoolId
    // }
});
const params = (userId) => ({
    UserPoolId: process.env.userPoolId || process.env.devUserPoolId,
    Username: userId.slice(1)
});

const command = new AdminDisableUserCommand(input);
const response = await client.send(command);
// {};


export const cognito = {
    disableUser: (userId) => {
        const command = AdminDisableUserCommand(params(userId));
        return cognitoClient.send(command)
    },
    deleteUser: (userId) => {
        const command = AdminDeleteUserCommand(params(userId));
        return cognitoClient.send(command)
    }
};