import {
    DynamoDBClient
} from "@aws-sdk/client-dynamodb"; // ES Modules import
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb"; // ES6 import

const client = new DynamoDBClient({ region: 'eu-central-1' });
const dbClient = DynamoDBDocument.from(client);

const MAX_TRANSACTWRITE = 10;
const withTable = (params) => ({
    TableName: process.env.photoTable || process.env.devPhotoTable || 'blob-images-photos-dev',
    ...params
});

const addTable = (transactItem) => {
    const firstKey = Object.keys(transactItem)[0];
    return {
        [firstKey]: withTable(transactItem[firstKey])
    };
};

const splitArr = (arr, size) => {
    let inArr = [...arr];
    let outArr = [];
    do {
        outArr.push(inArr.slice(0, size));
        inArr = inArr.slice(size);
    } while (inArr.length > 0);
    return outArr;
};

const splitTransact = (params) => {
    const transactions = params.TransactItems;
    const bundledTransactions = splitArr(transactions, MAX_TRANSACTWRITE);
    return Promise.all(
        bundledTransactions.map(transactionSet => {
            const bundledParams = {
                TransactItems: transactionSet.map(item => addTable(item))
            };
            return dbClient.transactWrite(bundledParams);
        })
    );
};

export const dynamoDb = {
    get: (params) => (dbClient.get(withTable(params))),
    put: (params) => (dbClient.put(withTable(params))),
    query: (params) => (dbClient.query(withTable(params))),
    update: (params) => (dbClient.update(withTable(params))),
    delete: (params) => (dbClient.delete(withTable(params))),
    transact: (params) => splitTransact(params),
};

export const dbUpdate = (PK, SK, key, newValue) => (dynamoDb.update({
    Key: {
        PK,
        SK,
    },
    UpdateExpression: "SET #k = :k",
    ExpressionAttributeNames: {
        '#k': key,
    },
    ExpressionAttributeValues: {
        ":k": newValue,
    },
    ReturnValues: "ALL_NEW"
}));

export const dbUpdateMulti = (PK, SK, newKV) => {
    const keys = Object.keys(newKV);
    let updateSet = [];
    let updateRemove = [];
    let ExpressionAttributeNames = {};
    let ExpressionAttributeValues = {};
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (newKV[key]) {
            // change value 
            updateSet.push(`#k${i} = :k${i}`);
            ExpressionAttributeNames[`#k${i}`] = key;
            ExpressionAttributeValues[`:k${i}`] = newKV[key];
        } else {
            // empty value: remove item
            updateRemove.push(`#k${i}`);
            ExpressionAttributeNames[`#k${i}`] = key;
        };
    };
    let UpdateExpression = (updateSet.length > 0) ? 'SET ' + updateSet.join(', ') : '';
    if (updateRemove.length > 0) {
        if (updateSet.length > 0) UpdateExpression += ' ';
        UpdateExpression += 'REMOVE ' + updateRemove.join(', ');
    };
    let updateParams = {
        Key: {
            PK,
            SK,
        },
        UpdateExpression,
        ExpressionAttributeNames,
        ReturnValues: "ALL_NEW"
    };
    if (Object.keys(ExpressionAttributeValues).length > 0) updateParams.ExpressionAttributeValues = ExpressionAttributeValues;
    return dynamoDb.update(updateParams);
};