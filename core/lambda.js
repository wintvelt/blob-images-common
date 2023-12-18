import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda"; // ES Modules import

const lambdaClient = new LambdaClient();

export const lambda = {
    invoke: (params) => {
        const command = new InvokeCommand(params);
        return lambdaClient(command);
    }
};