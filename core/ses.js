import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses"; // ES Modules import

const client = new SESClient(config);

const sesMail = ({ toEmail, fromEmail, subject, data, textData }) => ({
    Destination: {
        ToAddresses: (typeof toEmail === 'string') ?
            [toEmail]
            : toEmail,
    },
    Message: {
        Body: {
            Html: {
                Charset: "UTF-8",
                Data: data
            },
            Text: {
                Charset: "UTF-8",
                Data: textData
            }
        },
        Subject: {
            Charset: "UTF-8",
            Data: subject
        }
    },
    ReplyToAddresses: [
        fromEmail,
    ],
    Source: fromEmail,
});

export const ses = {
    send: (params) => {
        const command = new SendEmailCommand(params);
        return client.send(command);
    },
    sendEmail: (params) => {
        const command = new SendEmailCommand(sesMail(params));
        return client.send(command);
    }
};