import aws from 'aws-sdk';

const config = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    params: {
        TableName: process.env.TABLE_NAME,
    },
};
const client = new aws.DynamoDB.DocumentClient(config);

// Quick async wrapper around the DynamoDB Document client
const db = {
    get: (params) => client.get(params).promise(),
    put: (params) => client.put(params).promise(),
    query: (params) => client.query(params).promise(),
    update: (params) => client.update(params).promise(),
    delete: (params) => client.delete(params).promise(),
};
export default db;
